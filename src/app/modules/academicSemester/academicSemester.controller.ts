import { Request, Response } from 'express'
// import { errorlogger } from '../../../shared/logger'
import { AcademicSemesterService } from './academicSemester.services'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterFilterableFields } from './academicSemester.constant'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body
  const result =
    await AcademicSemesterService.createSemester(academicSemesterData)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  })
})
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  // console.log(paginationOptions)
  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions,
  )
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
  // if (!res.headersSent) {
  //   next()
  // }
})
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicSemesterService.getSingleSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully',
    data: result,
  })
  // if (!res.headersSent) {
  //   next()
  // }
})
const getUpdateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await AcademicSemesterService.getUpdateSemester(
    id,
    updatedData,
  )
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester update successfully',
    data: result,
  })
  // if (!res.headersSent) {
  //   next()
  // }
})
const getDeleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicSemesterService.getDeleteSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Deleted successfully',
    data: result,
  })
})
export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  getUpdateSemester,
  getDeleteSemester,
}
