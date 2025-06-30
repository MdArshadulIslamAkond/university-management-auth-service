export const gender = ['Male', 'Female', 'Other']
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export const studentSearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.firstname',
  'name.middleName',
  'name.lastname',
]
export const studentFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
]

export const EVENT_STUDENT_UPDATED = 'student.updated'
