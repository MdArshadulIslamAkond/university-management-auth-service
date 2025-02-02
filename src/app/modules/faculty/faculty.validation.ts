import { z } from 'zod'

const updatedFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({}).optional(),
      lastName: z.string({}).optional(),
      middleName: z.string().optional(),
    }),

    dateOfBirth: z.string({}).optional(),

    gender: z.string({}).optional(),

    bloodGroup: z.string({}).optional(),

    email: z.string({}).optional(),

    contactNo: z.string({}).optional(),

    emergencyContactNo: z.string({}).optional(),

    presentAddress: z.string({}).optional(),

    permanentAddress: z.string({}).optional(),

    academicDepartment: z.string({}).optional(),

    academicFaculty: z.string({}).optional(),

    designation: z.string({}).optional(),
  }),
})

export const FacultyValidation = {
  updatedFacultyZodSchema,
}
