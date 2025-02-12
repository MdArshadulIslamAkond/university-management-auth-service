import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import config from '../../../config'
import bcrypt from 'bcrypt'
// methods
// const userSchema = new Schema<IUser, UserModel, IUserMethods>(
// statics
const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)
// static methods
userSchema.statics.isUserExist = async function (
  id: string,
): Promise<Pick<
  IUser,
  'id' | 'password' | 'needsPasswordChange' | 'role'
> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1 },
  ).lean()
  return user
}
userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPassword, savedPassword)
  return isMatch
}

// // instance methods
// userSchema.methods.isUserExist = async function (
//   id: string,
// ): Promise<Partial<IUser> | null> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 },
//   )
//   return user
// }
// userSchema.methods.isPasswordMatch = async function (
//   givenPassword: string,
//   savedPassword: string,
// ): Promise<boolean> {
//   const isMatch = await bcrypt.compare(savedPassword, givenPassword)
//   return isMatch
// }
// pre hook methods
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  if (!this.needsPasswordChange) {
    this.passwordChangeAt = new Date()
  }
  next()
})
// 3. Create a Model.
export const User = model<IUser, UserModel>('User', userSchema)
