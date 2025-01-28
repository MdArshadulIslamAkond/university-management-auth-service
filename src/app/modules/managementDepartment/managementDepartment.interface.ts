import { Model } from 'mongoose'

export type IManagementDepartment = {
  title: string
}
export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, undefined>
>
export type IManagementDepartmentFilters = {
  searchTerm?: string
  title?: string
}
