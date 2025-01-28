import { model, Schema } from 'mongoose'
import {
  IManagementDepartment,
  ManagementDepartmentModel,
} from './managementDepartment.interface'

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>('ManagementDepartment', managementDepartmentSchema)
