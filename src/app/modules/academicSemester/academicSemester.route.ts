import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'
const router = express.Router()
router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
)
router.get('/:id', AcademicSemesterController.getSingleSemester)
router.get('/', AcademicSemesterController.getAllSemesters)
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.getUpdateSemester,
)
router.delete('/:id', AcademicSemesterController.getDeleteSemester)

export const AcademicSemesterRoutes = router
