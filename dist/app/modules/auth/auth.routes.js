"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validations_1 = require("./auth.validations");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validations_1.AuthValidation.loginZodSchema), auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validations_1.AuthValidation.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
router.post('/change-password', (0, validateRequest_1.default)(auth_validations_1.AuthValidation.passwordChangeZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT), auth_controller_1.AuthController.passwordChange);
// router.get('/', FacultyController.getAllFaculty)
// router.get('/:id', FacultyController.getSingleFaculty)
// router.patch(
//   '/:id',
//   validateRequest(FacultyValidation.updatedFacultyZodSchema),
//   FacultyController.getUpdateFaculty,
// )
// router.delete('/:id', FacultyController.getDeleteFaculty)
exports.AuthRoutes = router;
