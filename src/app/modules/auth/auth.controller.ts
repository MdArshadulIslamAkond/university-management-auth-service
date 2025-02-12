import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.services'
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface'
import config from '../../../config'
import { JwtPayload } from 'jsonwebtoken'
const loginUser = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.body)
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshAccessToken, ...others } = result
  // set refresh token into cookie
  const cookieOptions = {
    httpOnly: true,
    secure: config.env === 'production',
  }
  res.cookie('refreshAccessToken', refreshAccessToken, cookieOptions)

  // send back user data without refresh token
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: others,
  })
})
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.body)
  const { refreshAccessToken } = req.cookies
  const result = await AuthService.refreshToken(refreshAccessToken)
  // set refresh token into cookie
  const cookieOptions = {
    httpOnly: true,
    secure: config.env === 'production',
  }
  res.cookie('refreshAccessToken', refreshAccessToken, cookieOptions)

  // send back user data without refresh token
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  })
})
const passwordChange = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.body)
  const { ...passwordData } = req.body
  const user = req.user as JwtPayload
  await AuthService.passwordChange(user, passwordData)

  // send back user data without refresh token
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User password change in successfully',
  })
})

export const AuthController = {
  loginUser,
  refreshToken,
  passwordChange,
}
