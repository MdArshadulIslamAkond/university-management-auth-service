import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { StudentController } from './student.controller'
import { studentValidation } from './student.validation'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
const router = express.Router()
router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.getUpdateStudent,
)
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  StudentController.getAllStudent,
)
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  StudentController.getSingleStudent,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.getDeleteStudent,
)

export const StudentRoutes = router
