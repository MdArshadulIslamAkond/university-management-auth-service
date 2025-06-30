import { z } from 'zod'
import { bloodGroup, gender } from './user.constants'

const createStudentZodSchema = z.object({
  body: z.object({
    // id: z.string().optional(),
    // role: z.string({
    //   required_error: 'role is required',
    // }),
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood group is required',
      }),
      email: z.string({
        required_error: 'Email is required',
      }),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardiant: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
        address: z.string({
          required_error: 'Guardian address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guarantor name is required',
        }),
        occupation: z.string({
          required_error: 'Local guarantor occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guarantor contact number is required',
        }),
        address: z.string({
          required_error: 'Local guarantor address is required',
        }),
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      profileImage: z
        .string({
          required_error: 'Profile image is required',
        })
        .optional(),
    }),
  }),
})
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),
      email: z.string({
        required_error: 'Email is required',
      }),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      managementDepartment: z.string({
        required_error: 'Management department is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),

      profileImage: z
        .string({
          required_error: 'Profile image is required',
        })
        .optional(),
    }),
  }),
})
const createFacultyZodSchema = z.object({
  password: z.string().optional(),

  faculty: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
      middleName: z.string().optional(),
    }),

    dateOfBirth: z.string({
      required_error: 'Date of birth is required',
    }),

    gender: z.string({
      required_error: 'Gender is required',
    }),

    bloodGroup: z.string({
      required_error: 'Blood group is required',
    }),

    email: z.string({
      required_error: 'Email is required',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),

    emergencyContactNo: z.string({
      required_error: 'Emergency contact number is required',
    }),

    presentAddress: z.string({
      required_error: 'Present address is required',
    }),

    permanentAddress: z.string({
      required_error: 'Permanent address is required',
    }),

    academicDepartment: z.string({
      required_error: 'Academic department is required',
    }),

    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
    }),

    designation: z.string({
      required_error: 'Designation is required',
    }),
  }),
})
export const userValidation = {
  createStudentZodSchema,
  createAdminZodSchema,
  createFacultyZodSchema,
}
