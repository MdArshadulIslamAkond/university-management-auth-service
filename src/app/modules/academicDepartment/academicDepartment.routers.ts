import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validations'
import { AcademicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.createDepartment,
)
router.get('/:id', AcademicDepartmentController.getSingleDepartment)
router.get('/', AcademicDepartmentController.getAllDepartment)
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.getUpdateDepartment,
)
router.delete('/:id', AcademicDepartmentController.getDeleteDepartment)

export const AcademicDepartmentRoutes = router
