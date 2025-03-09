import { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { jwtHelpers } from '../../helpers/jwtHelper'
import config from '../../config'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get autorization token for authentication
      if (!req.headers.authorization) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid authorization')
      }
      const token = req.headers.authorization?.split(' ')[1]

      // verify token
      let varifiedUser = null
      varifiedUser = jwtHelpers.verify(token, config.jwt.secret as string)
      req.user = varifiedUser // userId, role

      // guard for Authorization
      if (requiredRoles && !requiredRoles.includes(varifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Access denied')
      }
      next()
    } catch (err) {
      next(err)
    }
  }
export default auth
