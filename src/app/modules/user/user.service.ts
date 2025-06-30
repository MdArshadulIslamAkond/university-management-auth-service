import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import {
  generatedAdminId,
  generatedFacultyId,
  generatedStudentId,
} from './user.utils'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { EVENT_FACULTY_CREATED, EVENT_STUDENT_CREATED } from './user.constants'
import { RedisClient } from '../../../shared/redis'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  // Set Role
  user.role = 'student'
  // Generate Student Id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generatedStudentId(academicSemester)
    user.id = id
    student.id = id
    const newStudent = await Student.create([student], { session })
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }
    // Set Student ---> _id into user.student
    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicSemester',
        },
      ],
    })
  }

  if (newUserAllData) {
    await RedisClient.publish(
      EVENT_STUDENT_CREATED,
      JSON.stringify(newUserAllData.student),
    )
  }

  return newUserAllData
}
const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_admin_pass as string
  }

  // Set Role
  user.role = 'admin'
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generatedAdminId()
    user.id = id
    admin.id = id
    const newAdmin = await Admin.create([admin], { session })
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin')
    }
    // Set Student ---> _id into user.student
    user.admin = newAdmin[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }

  if (newUserAllData) {
    await RedisClient.publish(
      EVENT_FACULTY_CREATED,
      JSON.stringify(newUserAllData.faculty),
    )
  }

  return newUserAllData
}
const createFaculty = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_pass as string
  }

  // Set Role
  user.role = 'faculty'
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generatedFacultyId()
    user.id = id
    faculty.id = id
    const newFaculty = await Faculty.create([faculty], { session })
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Faculty')
    }
    // Set Student ---> _id into user.student
    user.faculty = newFaculty[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'AcademicDepartment',
        },
        {
          path: 'AcademicFaculty',
        },
      ],
    })
  }
  return newUserAllData
}

export const UserService = {
  createStudent,
  createAdmin,
  createFaculty,
}
