import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { managementDepartmentSearchableFields } from './managementDepartment.constants'
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface'
import { ManagementDepartment } from './managementDepartment.model'
import httpStatus from 'http-status'

const createManagementDepartment = async (
  paylod: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(paylod)
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Could not create management department!',
    )
  }
  return result
}

const getAllManagementDepartments = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: managementDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i', // case insensitive search
        },
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
  const sortConditions: Record<string, SortOrder> = {}
  // const sortConditions: { [key: string]: string } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await ManagementDepartment.countDocuments(whereCondition)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleManagementDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById({ _id: id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Management department not found!')
  }
  return result
}

const getUpdateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Management department not found!')
  }
  return result
}

const getDeleteManagementDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete({ _id: id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Management department not found!')
  }
  return result
}

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  getUpdateManagementDepartment,
  getDeleteManagementDepartment,
}
