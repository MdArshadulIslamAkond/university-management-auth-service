import mongoose, { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { IAdmin, IAdminFilters } from './admin.interface'
import { adminSearchableFields } from './admin.constants'
import { Admin } from './admin.model'

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Admin.countDocuments(whereCondition)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('managementDepartment')

  return result
}
const getUpdateAdmin = async (
  id: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  // const isExist = await Admin.findOne({ _id: id })
  const isExist = await Admin.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !')
  }
  const { name, ...studentData } = payload
  const updatedStudentData: Partial<IAdmin> & Record<string, unknown> = {
    ...studentData,
  }

  // Dynamically update name
  if (name && Object.keys(name).length > 0) {
    Object.entries(name).forEach(([key, value]) => {
      const nameKey = `name.${key}`
      updatedStudentData[nameKey] = value
    })
  }
  const result = await Admin.findOneAndUpdate(
    // { _id: id },
    { id },
    updatedStudentData,
    {
      new: true,
    },
  )
  return result
}
const getDeleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const session = await mongoose.startSession()
  let result = null
  try {
    session.startTransaction()
    const deleteAdmin = await Admin.findOneAndDelete(
      { id },
      {
        session,
      },
    )
    if (!deleteAdmin) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !')
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
    result = deleteAdmin
    await session.commitTransaction()
    session.endSession()
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    throw err
  }
  return result
}

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  getUpdateAdmin,
  getDeleteAdmin,
}
