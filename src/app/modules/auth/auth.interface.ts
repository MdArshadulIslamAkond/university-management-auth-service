export type ILoginUser = {
  id: string
  password: string
}

export type ILoginUserResponse = {
  accessToken: string
  refreshAccessToken?: string
  needsPasswordChange: boolean
}
export type IPasswordChange = {
  oldPassword: string
  newPassword: string
}
export type IRefreshTokenResponse = {
  accessToken: string
}
