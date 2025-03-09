import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces'

export type IUser = {
  id: string
  role: string
  password: string
  needsPasswordChange: true | false
  passwordChangeAt: Date
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IAcademicFaculty
  admin?: Types.ObjectId
}
// instance methods
// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>
//   isPasswordMatch(
//     givenPassword: string,
//     savedPassword: string,
//   ): Promise<boolean>
// }
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>

// static methods
export type UserModel = Model<IUser> & {
  isUserExist(
    id: string,
  ): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange' | 'role'>>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
}
// export interface UserModel extends Model<IUser> {
//   myStaticMethod(): number;
// }
