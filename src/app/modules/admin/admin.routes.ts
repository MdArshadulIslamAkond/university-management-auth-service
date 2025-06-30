import express from 'express'
import { AdminController } from './admin.controller'
import validateRequest from '../../middleware/validateRequest'
import { AdminValidtion } from './admin.validation'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getAllAdmins,
)

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getSingleAdmin,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getDeleteAdmin,
)

router.patch(
  '/:id',
  validateRequest(AdminValidtion.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getUpdateAdmin,
)

export const AdminRoutes = router
