/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelper'
import { User } from '../user/user.model'
import bcrypt from 'bcrypt'
import {
  ILoginUser,
  ILoginUserResponse,
  IPasswordChange,
  IRefreshTokenResponse,
} from './auth.interface'
import httpStatus from 'http-status'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { Admin } from '../admin/admin.model'
import { Faculty } from '../faculty/faculty.model'
import { Student } from '../student/student.model'
import { sendEmail } from './sendResetMail'
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload
  //   // creating instance of User for method
  //   const user = new User()
  //   // check user exists
  //   const isUserExist = await user.isUserExist(id)
  const isUserExist = await User.isUserExist(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // Match password
  if (isUserExist.password) {
    // // Importing User model for method
    // const isPasswordMatch = await user.isPasswordMatch(
    // Importing User model for statics
    const isPasswordMatch = await User.isPasswordMatch(
      password,
      isUserExist?.password,
    )
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password')
    }
  }

  //Create access token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist
  // console.log(role)
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as string,
    config.jwt.expiration_in as string,
  )

  const refreshAccessToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expiration_in as string,
  )

  return {
    accessToken,
    refreshAccessToken,
    needsPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // varified access token
  let varifiedToken = null
  try {
    varifiedToken = jwtHelpers.verify(
      token,
      config.jwt.refresh_secret as string,
    )
    // console.log(varifiedToken)
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token')
  }
  const { userId } = varifiedToken
  // Check user exists with static parameters
  const isUserExist = await User.isUserExist(userId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  const { id, role } = isUserExist
  // Create new access token
  const newAccessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as string,
    config.jwt.expiration_in as string,
  )
  return { accessToken: newAccessToken }
}
const passwordChange = async (
  user: JwtPayload,
  payload: IPasswordChange,
): Promise<void> => {
  const { oldPassword, newPassword } = payload
  console.log(user?.userId)
  // user isExist
  // const isUserExist = await User.isUserExist(user?.userId)
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password',
  )
  console.log(isUserExist)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // Match old password
  if (isUserExist.password) {
    const isPasswordMatch = await User.isPasswordMatch(
      oldPassword,
      isUserExist?.password,
    )
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid old password')
    }
  }
  // // Update password
  // const newHashPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_rounds),
  // )
  // const query = { id: user?.userId }
  // const updateData = {
  //   password: newHashPassword,
  //   needsPasswordChange: false,
  //   passwordChangeAt: new Date(),
  // }
  // await User.findOneAndUpdate(query, updateData)

  // Alternate way
  isUserExist.needsPasswordChange = false
  isUserExist.password = newPassword
  await isUserExist.save()
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const { id, newPassword } = payload
  const user = await User.findOne({ id }, { id: 1 })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const isVarified = await jwtHelpers.verify(token, config.jwt.secret as string)
  if (!isVarified) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid access token')
  }
  const password = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.updateOne({ id }, { password })
}

const forgotPass = async (payload: { id: string }) => {
  const user = await User.findOne({ id: payload.id }, { id: 1, role: 1 })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!')
  }

  let profile = null
  if (user.role === ENUM_USER_ROLE.ADMIN) {
    profile = await Admin.findOne({ id: user.id })
  } else if (user.role === ENUM_USER_ROLE.FACULTY) {
    profile = await Faculty.findOne({ id: user.id })
  } else if (user.role === ENUM_USER_ROLE.STUDENT) {
    profile = await Student.findOne({ id: user.id })
  }

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pofile not found!')
  }

  if (!profile.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found!')
  }

  const passResetToken = await jwtHelpers.createResetToken(
    { id: user.id },
    config.jwt.secret as string,
    // '50m',
    config.jwt.expiration_in as string,
  )

  const resetLink: string = config.resetlink + `token=${passResetToken}`

  console.log('profile: ', profile)
  await sendEmail(
    profile.email,
    `
      <div>
        <p>Hi, ${profile.name.firstName}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `,
  )

  // return {
  //   message: "Check your email!"
  // }
}
export const AuthService = {
  loginUser,
  refreshToken,
  passwordChange,
  resetPassword,
  forgotPass,
}
