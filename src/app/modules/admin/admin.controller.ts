import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { adminFilterableFields } from './admin.constants'
import { IAdmin } from './admin.interface'
import { AdminService } from './admin.services'

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  // console.log(paginationOptions)
  const result = await AdminService.getAllAdmins(filters, paginationOptions)
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AdminService.getSingleAdmin(id)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})
const getUpdateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await AdminService.getUpdateAdmin(id, updatedData)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin update successfully',
    data: result,
  })
})
const getDeleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AdminService.getDeleteAdmin(id)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted successfully',
    data: result,
  })
})
export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  getUpdateAdmin,
  getDeleteAdmin,
}
