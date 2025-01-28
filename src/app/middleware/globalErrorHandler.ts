/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidatorError from '../../errors/handleValidatorError'
import ApiError from '../../errors/ApiError'
import { errorlogger } from '../../shared/logger'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
import handleCastError from '../../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('globalErrorHandler', error)
    : errorlogger.error('globalErrorHandler', error)
  let statusCode = 500
  let message = 'Internal Server Error!'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidatorError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
    // res.status(200).json({ error })
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  } else if (error instanceof Error) {
    message = error.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? error?.stack : undefined,
  })
  // next()
  if (!res.headersSent) {
    next()
  }
}

export default globalErrorHandler
