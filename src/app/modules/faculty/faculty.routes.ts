import express from 'express'

import validateRequest from '../../middleware/validateRequest'
import { FacultyValidation } from './faculty.validation'
import { FacultyController } from './faculty.controllers'

const router = express.Router()
router.get('/', FacultyController.getAllFaculty)

router.get('/:id', FacultyController.getSingleFaculty)
router.delete('/:id', FacultyController.getDeleteFaculty)

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updatedFacultyZodSchema),
  FacultyController.getUpdateFaculty,
)

export const FacultyRoutes = router
