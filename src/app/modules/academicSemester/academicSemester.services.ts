import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterCreatedEvent,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import httpStatus from 'http-status'

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid title and code combination!',
    )
  }
  const result = await AcademicSemester.create(payload)
  if (!result) {
    throw new ApiError(400, 'Could not create academic semester!')
  }
  return result
}

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andCondition = []
  if (searchTerm) {
    const isNumeric = !isNaN(Number(searchTerm)) // Check if searchTerm is numeric
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field =>
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
  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         // title: { $regex: new RegExp(searchTerm, 'i') },

  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         // code: { $regex: new RegExp(searchTerm, 'i') },

  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       // {
  //       //   // year: { $regex: new RegExp(searchTerm, '') },
  //       //   year: {
  //       //     $regex: parseInt(searchTerm),
  //       //     // $options: 'i',
  //       //   },
  //       // },
  //       ...(isNumeric
  //         ? [
  //             {
  //               year: Number(searchTerm),
  //             },
  //           ]
  //         : []),
  //     ],
  //   },
  // ]
  // ,sortBy, sortOrder

  const sortConditions: Record<string, SortOrder> = {}
  // const sortConditions: { [key: string]: string } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}
const getUpdateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid title and code combination!',
    )
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
const getDeleteSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

const createSemesterFromEvent = async (
  e: IAcademicSemesterCreatedEvent,
): Promise<void> => {
  await AcademicSemester.create({
    title: e.title,
    year: e.year,
    code: e.code,
    startMonth: e.startMonth,
    endMonth: e.endMonth,
    syncId: e.id,
  })
}

const updateOneIntoDBFromEvent = async (
  e: IAcademicSemesterCreatedEvent,
): Promise<void> => {
  await AcademicSemester.findOneAndUpdate(
    { syncId: e.id },
    {
      $set: {
        title: e.title,
        year: e.year,
        code: e.code,
        startMonth: e.startMonth,
        endMonth: e.endMonth,
      },
    },
  )
}

const deleteOneFromDBFromEvent = async (syncId: string): Promise<void> => {
  await AcademicSemester.findOneAndDelete({ syncId })
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  getUpdateSemester,
  getDeleteSemester,
  createSemesterFromEvent,
  updateOneIntoDBFromEvent,
  deleteOneFromDBFromEvent,
}
