import { model, Schema } from 'mongoose'
import { AdminModel, IAdmin } from './admin.interface'
import { bloodGroup, gender } from '../student/student.constants'

export const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: gender,
      // required: true
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
      // required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema)
