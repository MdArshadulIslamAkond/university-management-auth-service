"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const academicFaculty_routers_1 = require("../modules/academicFaculty/academicFaculty.routers");
const academicDepartment_routers_1 = require("../modules/academicDepartment/academicDepartment.routers");
const student_routes_1 = require("../modules/student/student.routes");
const managementDepartment_routes_1 = require("../modules/managementDepartment/managementDepartment.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_routers_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_routers_1.AcademicDepartmentRoutes,
    },
    {
        path: '/student',
        route: student_routes_1.StudentRoutes,
    },
    {
        path: '/management-departments',
        route: managementDepartment_routes_1.ManagementDepartmentRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
];
moduleRoutes.forEach(module => {
    router.use(module.path, module.route);
});
// router.use('/users', UserRoutes)
// router.use('/academic-semesters', AcademicSemesterRoutes)
exports.default = router;
