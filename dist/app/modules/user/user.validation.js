"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        // id: z.string().optional(),
        // role: z.string({
        //   required_error: 'role is required',
        // }),
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            gender: zod_1.z.enum([...user_constants_1.gender], {
                required_error: 'Gender is required',
            }),
            bloodGroup: zod_1.z.enum([...user_constants_1.bloodGroup], {
                required_error: 'Blood group is required',
            }),
            email: zod_1.z.string({
                required_error: 'Email is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
            }),
            guardiant: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father name is required',
                }),
                motherName: zod_1.z.string({
                    required_error: 'Mother name is required',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father occupation is required',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother occupation is required',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'Father contact number is required',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother contact number is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Guardian address is required',
                }),
            }),
            localGuarian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Local guarantor name is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Local guarantor occupation is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local guarantor contact number is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Local guarantor address is required',
                }),
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicSemester: zod_1.z.string({
                required_error: 'Academic semester is required',
            }),
            profileImage: zod_1.z
                .string({
                required_error: 'Profile image is required',
            })
                .optional(),
        }),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            gender: zod_1.z.enum([...user_constants_1.gender], {
                required_error: 'Gender is required',
            }),
            bloodGroup: zod_1.z
                .enum([...user_constants_1.bloodGroup], {
                required_error: 'Blood group is required',
            })
                .optional(),
            email: zod_1.z.string({
                required_error: 'Email is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
            }),
            managementDepartment: zod_1.z.string({
                required_error: 'Management department is required',
            }),
            designation: zod_1.z.string({
                required_error: 'Designation is required',
            }),
            profileImage: zod_1.z
                .string({
                required_error: 'Profile image is required',
            })
                .optional(),
        }),
    }),
});
const createFacultyZodSchema = zod_1.z.object({
    password: zod_1.z.string().optional(),
    faculty: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
            middleName: zod_1.z.string().optional(),
        }),
        dateOfBirth: zod_1.z.string({
            required_error: 'Date of birth is required',
        }),
        gender: zod_1.z.string({
            required_error: 'Gender is required',
        }),
        bloodGroup: zod_1.z.string({
            required_error: 'Blood group is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact number is required',
        }),
        emergencyContactNo: zod_1.z.string({
            required_error: 'Emergency contact number is required',
        }),
        presentAddress: zod_1.z.string({
            required_error: 'Present address is required',
        }),
        permanentAddress: zod_1.z.string({
            required_error: 'Permanent address is required',
        }),
        academicDepartment: zod_1.z.string({
            required_error: 'Academic department is required',
        }),
        academicFaculty: zod_1.z.string({
            required_error: 'Academic faculty is required',
        }),
        designation: zod_1.z.string({
            required_error: 'Designation is required',
        }),
    }),
});
exports.userValidation = {
    createStudentZodSchema,
    createAdminZodSchema,
    createFacultyZodSchema,
};
