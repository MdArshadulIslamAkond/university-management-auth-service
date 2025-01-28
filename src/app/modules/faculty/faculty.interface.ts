import { Model, Types } from 'mongoose'
import { IAcademicDepaetment } from '../academicDepartment/academicDepartment.interfaces'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}
export type IFaculty = {
  id: string
  name: UserName //embedded object
  dateOfBirth: string
  gender: 'Male' | 'Female' | 'Other'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  profileImage?: string
  academicDepartment: Types.ObjectId | IAcademicDepaetment
  academicFaculty: Types.ObjectId | IAcademicFaculty
  designation: string
}

export type FacultyModel = Model<IFaculty, Record<string, undefined>>

export type IFacultyFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
