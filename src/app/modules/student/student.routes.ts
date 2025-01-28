import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { StudentController } from './student.controller'
import { studentValidation } from './student.validation'
const router = express.Router()
router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  StudentController.getUpdateStudent,
)
router.get('/', StudentController.getAllStudent)
router.get('/:id', StudentController.getSingleStudent)
router.delete('/:id', StudentController.getDeleteStudent)

export const StudentRoutes = router
