import express from 'express'
import { AdminController } from './admin.controller'
import validateRequest from '../../middleware/validateRequest'
import { AdminValidtion } from './admin.validation'
const router = express.Router()
router.get('/', AdminController.getAllAdmins)

router.get('/:id', AdminController.getSingleAdmin)
router.delete('/:id', AdminController.getDeleteAdmin)

router.patch(
  '/:id',
  validateRequest(AdminValidtion.createAdminZodSchema),
  AdminController.getUpdateAdmin,
)

export const AdminRoutes = router
