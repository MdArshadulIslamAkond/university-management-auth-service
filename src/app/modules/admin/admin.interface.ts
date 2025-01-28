import { Model, Types } from 'mongoose'

import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}
export type IAdmin = {
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
  managementDepartment: Types.ObjectId | IManagementDepartment
  designation: string
}

export type AdminModel = Model<IAdmin, Record<string, undefined>>

export type IAdminFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
