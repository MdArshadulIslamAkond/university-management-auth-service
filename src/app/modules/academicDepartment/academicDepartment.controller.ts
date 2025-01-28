import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicDepartmentFilterableFields } from './academicDepartment.constants'
import { IAcademicDepaetment } from './academicDepartment.interfaces'
import { AcademicDepartmentService } from './academicDepartment.service'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData,
  )
  sendResponse<IAcademicDepaetment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully',
    data: result,
  })
})
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions,
  )
  sendResponse<IAcademicDepaetment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department are fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.getSingleDepartment(id)
  sendResponse<IAcademicDepaetment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is fetched successfully',
    data: result,
  })
})

const getUpdateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...academicDepartmentData } = req.body
  const result = await AcademicDepartmentService.getUpdateDepartment(
    id,
    academicDepartmentData,
  )
  sendResponse<IAcademicDepaetment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is updated successfully',
    data: result,
  })
})
const getDeleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.getDeleteDepaerment(id)
  sendResponse<IAcademicDepaetment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is deleted successfully',
    data: result,
  })
})
export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  getUpdateDepartment,
  getDeleteDepartment,
}
