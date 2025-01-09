import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// import usersService from './app/modules/users/users.service'
import usersRouter from './app/modules/users/users.route'
const app: Application = express()
// const port = 3000
// middleware
app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routers
app.use('/api/v1/users', usersRouter)
//Testing
app.get('/', async (req: Request, res: Response) => {
  // await usersService.createUser({
  //   id: '999',
  //   password: '12345',
  //   role: 'student',
  // })
  res.send('Working Successfully!')
})

export default app

//package json
// "lint:fix": "eslint --fix",
