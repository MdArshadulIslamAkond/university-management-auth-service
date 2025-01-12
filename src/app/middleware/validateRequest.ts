import { AnyZodObject } from 'zod'
import { errorlogger } from '../../shared/logger'
import { NextFunction, Request, Response } from 'express'

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      })
    } catch (error) {
      errorlogger.error('Error creating user', error)

      next(error)
    }
  }

export default validateRequest
