import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IManagementDepartment } from './managementDepartment.interface'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { managementDepartmentFilterableFields } from './managementDepartment.constants'
import { ManagementDepartmentService } from './managementDepartment.service'

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData,
    )
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully',
      data: result,
    })
  },
)

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions,
      )
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management departments retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)

const getSinglelManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id)
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retrieved successfully',
      data: result,
    })
  },
)

const getUpdateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { ...managementDepartmentData } = req.body
    const result =
      await ManagementDepartmentService.getUpdateManagementDepartment(
        id,
        managementDepartmentData,
      )
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    })
  },
)

const getDeleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await ManagementDepartmentService.getDeleteManagementDepartment(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department deleted successfully',
      data: result,
    })
  },
)

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSinglelManagementDepartment,
  getUpdateManagementDepartment,
  getDeleteManagementDepartment,
}
