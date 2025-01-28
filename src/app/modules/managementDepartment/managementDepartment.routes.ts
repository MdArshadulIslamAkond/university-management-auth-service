import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { ManagementDepartmentValidation } from './managementDepartment.validation'
import { ManagementDepartmentController } from './managementDepartment.controller'
const router = express.Router()

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
)

router.get('/', ManagementDepartmentController.getAllManagementDepartments)
router.delete(
  '/:id',
  ManagementDepartmentController.getDeleteManagementDepartment,
)

router.get(
  '/:id',
  ManagementDepartmentController.getSinglelManagementDepartment,
)

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.getUpdateManagementDepartment,
)

export const ManagementDepartmentRoutes = router
