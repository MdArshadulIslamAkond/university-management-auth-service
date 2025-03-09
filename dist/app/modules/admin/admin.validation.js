"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidtion = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("../user/user.constants");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z
                .string({
                required_error: 'First name is required',
            })
                .optional(),
            middleName: zod_1.z
                .string({
                required_error: 'Middle name is required',
            })
                .optional(),
            lastName: zod_1.z
                .string({
                required_error: 'Last name is required',
            })
                .optional(),
        })
            .optional(),
        dateOfBirth: zod_1.z
            .string({
            required_error: 'Date of birth is required',
        })
            .optional(),
        gender: zod_1.z
            .enum([...user_constants_1.gender], {
            required_error: 'Gender is required',
        })
            .optional(),
        bloodGroup: zod_1.z
            .enum([...user_constants_1.bloodGroup], {
            required_error: 'Blood group is required',
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .optional(),
        contactNo: zod_1.z
            .string({
            required_error: 'Contact number is required',
        })
            .optional(),
        emergencyContactNo: zod_1.z
            .string({
            required_error: 'Emergency contact number is required',
        })
            .optional(),
        presentAddress: zod_1.z
            .string({
            required_error: 'Present address is required',
        })
            .optional(),
        permanentAddress: zod_1.z
            .string({
            required_error: 'Permanent address is required',
        })
            .optional(),
        managementDepartment: zod_1.z
            .string({
            required_error: 'Management department is required',
        })
            .optional(),
        designation: zod_1.z
            .string({
            required_error: 'Designation is required',
        })
            .optional(),
        profileImage: zod_1.z
            .string({
            required_error: 'Profile image is required',
        })
            .optional(),
    }),
});
exports.AdminValidtion = {
    createAdminZodSchema,
};
