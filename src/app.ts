import express, { Application } from 'express'
import cors from 'cors'
// import usersService from './app/modules/users/users.service'
// import { errorlogger } from './shared/logger'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'
// import ApiError from './errors/ApiError'
const app: Application = express()
// const port = 3000
// middleware
app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application ENV
// console.log(app.get('env'))

// Application routers
app.use('/api/v1/users', UserRoutes)

//Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // await usersService.createUser({
//   //   id: '999',
//   //   password: '12345',
//   //   role: 'student',
//   // })
//   res.send('Working Successfully!')
//   // throw new ApiError(400, 'Ora Baba Error')
//   // Promise.reject(new Error('Unhandled Promise Error'))
//   // console.log(x)
//   // next('Ora Baba Error')
// })

// Error handling middleware

app.use(globalErrorHandler)
export default app
