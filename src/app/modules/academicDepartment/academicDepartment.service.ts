import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'

import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import {
  IAcademicDepaetment,
  IAcademicDepartmentFilterRequest,
} from './academicDepartment.interfaces'
import { AcademicDepartment } from './academicDepartment.model'
import { academicDepartmentSerarchableFields } from './academicDepartment.constants'

const createDepartment = async (
  payload: IAcademicDepaetment,
): Promise<IAcademicDepaetment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  )
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Could not create academic Department!',
    )
  }
  return result
}
const getAllDepartments = async (
  filters: IAcademicDepartmentFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDepaetment[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSerarchableFields.map(field => ({
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

  const sortConditions: Record<string, SortOrder> = {}
  // const sortConditions: { [key: string]: string } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicDepartment.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleDepartment = async (
  id: string,
): Promise<IAcademicDepaetment | null> => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty')
  return result
}
const getUpdateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepaetment>,
): Promise<IAcademicDepaetment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  ).populate('academicFaculty')
  return result
}
const getDeleteDepaerment = async (
  id: string,
): Promise<IAcademicDepaetment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id)
  return result
}

export const AcademicDepartmentService = {
  getAllDepartments,
  createDepartment,
  getSingleDepartment,
  getUpdateDepartment,
  getDeleteDepaerment,
}
