import { Model, Types } from 'mongoose'

import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces'
import { IAcademicDepaetment } from '../academicDepartment/academicDepartment.interfaces'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}
export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}
export type localGuarian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type IStudent = {
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
  guardiant: Guardian //embedded object
  localGuarian: localGuarian //embedded object
  profileImage?: string
  academicFaculty: Types.ObjectId | IAcademicFaculty // refarence _id
  academicDepartment: Types.ObjectId | IAcademicDepaetment // refarence _id
  academicSemester: Types.ObjectId | IAcademicSemester // refarence _id
}

export type StudentModel = Model<IStudent, Record<string, undefined>>

export type IStudentFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
