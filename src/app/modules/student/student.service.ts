import mongoose, { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IStudent, IStudentFilters } from './student.interface'
import {
  EVENT_STUDENT_UPDATED,
  studentSearchableFields,
} from './student.constants'
import { Student } from './student.model'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { RedisClient } from '../../../shared/redis'

const getAllStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andCondition = []
  if (searchTerm) {
    const isNumeric = !isNaN(Number(searchTerm)) // Check if searchTerm is numeric
    andCondition.push({
      $or: studentSearchableFields.map(field =>
        isNumeric && field === 'year'
          ? { [field]: Number(searchTerm) }
          : field !== 'year'
            ? { [field]: { $regex: searchTerm, $options: 'i' } }
            : {},
      ),
    })
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: Record<string, SortOrder> = {}
  // const sortConditions: { [key: string]: string } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await Student.find(whereCondition)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Student.countDocuments(whereCondition)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
  return result
}
const getUpdateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  // const isExist = await Student.findOne({ _id: id })
  const isExist = await Student.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !')
  }
  const { name, guardiant, localGuarian, ...studentData } = payload
  const updatedStudentData: Partial<IStudent> & Record<string, unknown> = {
    ...studentData,
  }

  // Dynamically update name
  if (name && Object.keys(name).length > 0) {
    Object.entries(name).forEach(([key, value]) => {
      const nameKey = `name.${key}`
      updatedStudentData[nameKey] = value
    })
  }
  // Dynamically update guardiant
  if (guardiant && Object.keys(guardiant).length > 0) {
    Object.entries(guardiant).forEach(([key, value]) => {
      const guardiantKey = `guardiant.${key}`
      updatedStudentData[guardiantKey] = value
    })
  }
  // Dynamically update localGuarian
  if (localGuarian && Object.keys(localGuarian).length > 0) {
    Object.entries(localGuarian).forEach(([key, value]) => {
      const localGuarianKey = `localGuarian.${key}`
      updatedStudentData[localGuarianKey] = value
    })
  }
  const result = await Student.findOneAndUpdate(
    // { _id: id },
    { id },
    updatedStudentData,
    {
      new: true,
    },
  )

  if (result) {
    await RedisClient.publish(EVENT_STUDENT_UPDATED, JSON.stringify(result))
  }

  return result
}
const getDeleteStudent = async (id: string): Promise<IStudent | null> => {
  const session = await mongoose.startSession()
  let result = null
  try {
    session.startTransaction()
    const deleteStudent = await Student.findOneAndDelete(
      { id },
      {
        session,
      },
    )
    if (!deleteStudent) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !')
    }
    const deleteUser = await User.findOneAndDelete(
      { id },
      {
        session,
      },
    )
    if (!deleteUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
    }
    result = deleteStudent
    await session.commitTransaction()
    session.endSession()
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    throw err
  }
  return result
}

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  getUpdateStudent,
  getDeleteStudent,
}
