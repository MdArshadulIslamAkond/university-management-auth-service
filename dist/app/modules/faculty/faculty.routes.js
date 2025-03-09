"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const faculty_controllers_1 = require("./faculty.controllers");
const router = express_1.default.Router();
router.get('/', faculty_controllers_1.FacultyController.getAllFaculty);
router.get('/:id', faculty_controllers_1.FacultyController.getSingleFaculty);
router.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.FacultyValidation.updatedFacultyZodSchema), faculty_controllers_1.FacultyController.getUpdateFaculty);
router.delete('/:id', faculty_controllers_1.FacultyController.getDeleteFaculty);
exports.FacultyRoutes = router;
