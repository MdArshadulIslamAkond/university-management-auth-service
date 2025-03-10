import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IFaculty } from './faculty.interface'
import { facultyFilterableFields } from './faculty.constants'
import { FacultyService } from './faculty.service'

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  // console.log(paginationOptions)
  const result = await FacultyService.getAllFaculty(filters, paginationOptions)
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.getSingleFaculty(id)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  })
})
const getUpdateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await FacultyService.getUpdateFaculty(id, updatedData)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty update successfully',
    data: result,
  })
})
const getDeleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.getDeleteFaculty(id)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted successfully',
    data: result,
  })
})
export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  getUpdateFaculty,
  getDeleteFaculty,
}
