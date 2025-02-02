import { z } from 'zod'
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(
      [...academicSemesterTitles] as [string, ...string[]],
      // academicSemesterTitles as [string, ...string[]],
      {
        required_error: 'Title is required',
      },
    ),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum(
      [...academicSemesterCodes] as [string, ...string[]],
      // academicSemesterCodes as [string, ...string[]],
      {
        required_error: 'Semester code is required',
      },
    ),
    startMonth: z.enum(
      [...academicSemesterMonths] as [string, ...string[]],
      // academicSemesterMonths as [string, ...string[]],
      {
        required_error: 'Start month is required',
      },
    ),
    endMonth: z.enum(
      [...academicSemesterMonths] as [string, ...string[]],
      // academicSemesterMonths as [string, ...string[]],
      {
        required_error: 'End month is required',
      },
    ),
  }),
})
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum(
          [...academicSemesterTitles] as [string, ...string[]],
          // academicSemesterTitles as [string, ...string[]],
          {
            required_error: 'Title is required',
          },
        )
        .optional(),
      year: z
        .number({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum(
          [...academicSemesterCodes] as [string, ...string[]],
          // academicSemesterCodes as [string, ...string[]],
          {
            required_error: 'Semester code is required',
          },
        )
        .optional(),
      startMonth: z
        .enum(
          [...academicSemesterMonths] as [string, ...string[]],
          // academicSemesterMonths as [string, ...string[]],
          {
            required_error: 'Start month is required',
          },
        )
        .optional(),
      endMonth: z
        .enum(
          [...academicSemesterMonths] as [string, ...string[]],
          // academicSemesterMonths as [string, ...string[]],
          {
            required_error: 'End month is required',
          },
        )
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    },
  )

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
