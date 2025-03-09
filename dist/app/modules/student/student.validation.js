"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidation = void 0;
const zod_1 = require("zod");
const student_constants_1 = require("./student.constants");
const updateStudentZodSchema = zod_1.z.object({
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
            .enum([...student_constants_1.gender], {
            required_error: 'Gender is required',
        })
            .optional(),
        bloodGroup: zod_1.z
            .enum([...student_constants_1.bloodGroup], {
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
        guardiant: zod_1.z
            .object({
            fatherName: zod_1.z
                .string({
                required_error: 'Father name is required',
            })
                .optional(),
            motherName: zod_1.z
                .string({
                required_error: 'Mother name is required',
            })
                .optional(),
            fatherOccupation: zod_1.z
                .string({
                required_error: 'Father occupation is required',
            })
                .optional(),
            motherOccupation: zod_1.z
                .string({
                required_error: 'Mother occupation is required',
            })
                .optional(),
            fatherContactNo: zod_1.z
                .string({
                required_error: 'Father contact number is required',
            })
                .optional(),
            motherContactNo: zod_1.z
                .string({
                required_error: 'Mother contact number is required',
            })
                .optional(),
            address: zod_1.z
                .string({
                required_error: 'Guardian address is required',
            })
                .optional(),
        })
            .optional(),
        localGuarian: zod_1.z
            .object({
            name: zod_1.z
                .string({
                required_error: 'Local guarantor name is required',
            })
                .optional(),
            occupation: zod_1.z
                .string({
                required_error: 'Local guarantor occupation is required',
            })
                .optional(),
            contactNo: zod_1.z
                .string({
                required_error: 'Local guarantor contact number is required',
            })
                .optional(),
            address: zod_1.z
                .string({
                required_error: 'Local guarantor address is required',
            })
                .optional(),
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            required_error: 'Academic faculty is required',
        })
            .optional(),
        academicDepartment: zod_1.z
            .string({
            required_error: 'Academic department is required',
        })
            .optional(),
        academicSemester: zod_1.z
            .string({
            required_error: 'Academic semester is required',
        })
            .optional(),
        profileImage: zod_1.z
            .string({
            required_error: 'Profile image is required',
        })
            .optional(),
    }),
});
exports.studentValidation = {
    updateStudentZodSchema,
};
