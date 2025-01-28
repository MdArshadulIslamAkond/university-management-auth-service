import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { userValidation } from './user.validation'
const router = express.Router()
router.post(
  '/create-student',
  validateRequest(userValidation.createUserZodSchema),
  UserController.createStudent,
)
router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminZodSchema),
  UserController.createAdmin,
)

export const UserRoutes = router
