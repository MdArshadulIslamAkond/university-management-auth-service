"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = exports.FacultySchema = void 0;
const mongoose_1 = require("mongoose");
const student_constants_1 = require("../student/student.constants");
exports.FacultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: { type: String, required: true },
            middleName: { type: String },
            lastName: { type: String, required: true },
        },
        required: true,
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: student_constants_1.gender,
        // required: true
    },
    bloodGroup: {
        type: String,
        enum: student_constants_1.bloodGroup,
        // required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo: {
        type: String,
        required: true,
        unique: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        // required: true
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
exports.Faculty = (0, mongoose_1.model)('Faculty', exports.FacultySchema);
