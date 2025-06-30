import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces'

export type IAcademicDepaetment = {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
  syncId: string
}

export type AcademicDepartmentModel = Model<
  IAcademicDepaetment,
  Record<string, unknown>
>

export type IAcademicDepartmentFilterRequest = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}

export type AcademicDepartmentCreatedEvent = {
  id: string
  title: string
  academicFacultyId: string
}

export type AcademicDepartmentUpdatedEvent = {
  id: string
  title: string
  academicFacultyId: string
}

export type AcademicDepartmentDeletedEvent = {
  id: string
}
