import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}
export const generatedStudentId = async (
  academicSemester: IAcademicSemester | null,
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `${academicSemester?.year.toString().substring(2)}${academicSemester?.code}${incrementedId}`
  return incrementedId
  // console.log(incrementedId)
}

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export const generatedFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `F-${incrementedId}`
  return incrementedId
}
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export const generatedAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `A-${incrementedId}`
  return incrementedId
}
