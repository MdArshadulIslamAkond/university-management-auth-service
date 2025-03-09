import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
// import { logger, errorlogger } from './shared/logger'
import { Server } from 'http'

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  // console.log('Unhandled Exception detected..........')
  console.log(error)
  process.exit(1)
})
let server: Server | undefined
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Connected to the MongoDB server successfully')

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connect to the MongoDB server', err)
  }

  // Handle unhandled promise rejections
  process.on('unhandledRejection', error => {
    // console.log(
    //   'Unhandled Rejection is detected, we are closing our server..........',
    // )
    if (server) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()
// "prettier:check": "prettier --write ",
//  "lint:check": "eslint --ext .js,.ts .",

// console.log(x)
process.on('SIGTERM', () => {
  console.log('SIGTERM received, exiting gracefully')
  if (server) {
    server.close()
  }
})
