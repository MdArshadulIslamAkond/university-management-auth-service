import mongoose, { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { Faculty } from './faculty.model'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import {
  EVENT_FACULTY_UPDATED,
  facultySearchableFields,
} from './faculty.constants'
import { RedisClient } from '../../../shared/redis'

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: facultySearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
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

  const result = await Faculty.find(whereCondition)
    .populate('AcademicDepartment')
    .populate('AcademicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Faculty.countDocuments(whereCondition)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('AcademicDepartment')
    .populate('AcademicFaculty')

  return result
}
const getUpdateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  // const isExist = await Admin.findOne({ _id: id })
  const isExist = await Faculty.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !')
  }
  const { name, ...facultyData } = payload
  const updatedFacultyData: Partial<IFaculty> & Record<string, unknown> = {
    ...facultyData,
  }

  // Dynamically update name
  if (name && Object.keys(name).length > 0) {
    Object.entries(name).forEach(([key, value]) => {
      const nameKey = `name.${key}`
      updatedFacultyData[nameKey] = value
    })
  }
  const result = await Faculty.findOneAndUpdate(
    // { _id: id },
    { id },
    updatedFacultyData,
    {
      new: true,
    },
  )

  if (result) {
    await RedisClient.publish(EVENT_FACULTY_UPDATED, JSON.stringify(result))
  }
  return result
}
const getDeleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const session = await mongoose.startSession()
  let result = null
  try {
    session.startTransaction()
    const deleteFaculty = await Faculty.findOneAndDelete(
      { id },
      {
        session,
      },
    )
    if (!deleteFaculty) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !')
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
    result = deleteFaculty
    await session.commitTransaction()
    session.endSession()
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    throw err
  }
  return result
}

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  getUpdateFaculty,
  getDeleteFaculty,
}
