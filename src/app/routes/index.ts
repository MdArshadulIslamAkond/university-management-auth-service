import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routers'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routers'
import { StudentRoutes } from '../modules/student/student.routes'
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.routes'
import { AdminRoutes } from '../modules/admin/admin.routes'
import { AuthRoutes } from '../modules/auth/auth.routes'

const router = express.Router()
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
]

moduleRoutes.forEach(module => {
  router.use(module.path, module.route)
})
// router.use('/users', UserRoutes)
// router.use('/academic-semesters', AcademicSemesterRoutes)
export default router
