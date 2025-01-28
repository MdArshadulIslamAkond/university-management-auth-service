import { z } from 'zod'
import { bloodGroup, gender } from '../user/user.constants'

const createAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        middleName: z
          .string({
            required_error: 'Middle name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    dateOfBirth: z
      .string({
        required_error: 'Date of birth is required',
      })
      .optional(),
    gender: z
      .enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      })
      .optional(),
    bloodGroup: z
      .enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood group is required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'Contact number is required',
      })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: 'Emergency contact number is required',
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: 'Present address is required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent address is required',
      })
      .optional(),
    managementDepartment: z
      .string({
        required_error: 'Management department is required',
      })
      .optional(),
    designation: z
      .string({
        required_error: 'Designation is required',
      })
      .optional(),
    profileImage: z
      .string({
        required_error: 'Profile image is required',
      })
      .optional(),
  }),
})

export const AdminValidtion = {
  createAdminZodSchema,
}
