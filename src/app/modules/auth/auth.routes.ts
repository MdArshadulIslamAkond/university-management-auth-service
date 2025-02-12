import express from 'express'

import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validations'
import { AuthController } from './auth.controller'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,
)
router.post(
  '/change-password',
  validateRequest(AuthValidation.passwordChangeZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  AuthController.passwordChange,
)
// router.get('/', FacultyController.getAllFaculty)

// router.get('/:id', FacultyController.getSingleFaculty)
// router.patch(
//   '/:id',
//   validateRequest(FacultyValidation.updatedFacultyZodSchema),
//   FacultyController.getUpdateFaculty,
// )
// router.delete('/:id', FacultyController.getDeleteFaculty)

export const AuthRoutes = router
