import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces'

export type IAcademicDepaetment = {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type AcademicDepartmentModel = Model<
  IAcademicDepaetment,
  Record<string, unknown>
>

export type IAcademicDepartmentFilterRequest = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}
