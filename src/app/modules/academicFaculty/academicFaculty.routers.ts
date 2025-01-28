import express from 'express'
import { AcademicFacultyValidation } from './academicFaculty.validations'
import validateRequest from '../../middleware/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty,
)
router.get('/:id', AcademicFacultyController.getSingleFaculty)
router.get('/', AcademicFacultyController.getAllFaculties)
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
  AcademicFacultyController.getUpdateFaculty,
)
router.delete('/:id', AcademicFacultyController.getDeleteFaculty)

export const AcademicFacultyRoutes = router
