import express from 'express'

import validateRequest from '../../middleware/validateRequest'
import { FacultyValidation } from './faculty.validation'
import { FacultyController } from './faculty.controllers'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'

const router = express.Router()
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  FacultyController.getAllFaculty,
)

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  FacultyController.getSingleFaculty,
)
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updatedFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.getUpdateFaculty,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyController.getDeleteFaculty,
)

export const FacultyRoutes = router
