import { model, Schema } from 'mongoose'
import {
  AcademicDepartmentModel,
  IAcademicDepaetment,
} from './academicDepartment.interfaces'

const AcademicDepartmentSchema = new Schema<
  IAcademicDepaetment,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const AcademicDepartment = model<
  IAcademicDepaetment,
  AcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema)
