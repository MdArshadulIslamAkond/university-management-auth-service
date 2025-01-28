import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IStudent } from './student.interface'
import { studentFilterableFields } from './student.constants'
import { StudentService } from './student.service'

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  // console.log(paginationOptions)
  const result = await StudentService.getAllStudent(filters, paginationOptions)
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await StudentService.getSingleStudent(id)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  })
})
const getUpdateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await StudentService.getUpdateStudent(id, updatedData)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student update successfully',
    data: result,
  })
})
const getDeleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await StudentService.getDeleteStudent(id)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted successfully',
    data: result,
  })
})
export const StudentController = {
  getAllStudent,
  getSingleStudent,
  getUpdateStudent,
  getDeleteStudent,
}
