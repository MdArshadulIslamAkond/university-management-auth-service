import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errorlogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to the MongoDB server successfully')

    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect to the MongoDB server', err)
  }
}

bootstrap()
// "prettier:check": "prettier --write ",
//  "lint:check": "eslint --ext .js,.ts .",
