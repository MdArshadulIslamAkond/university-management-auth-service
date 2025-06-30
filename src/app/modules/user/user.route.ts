import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { userValidation } from './user.validation'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
const router = express.Router()
router.post(
  '/create-student',
  validateRequest(userValidation.createStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudent,
)
router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin,
)
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin,
)

export const UserRoutes = router
