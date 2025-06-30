import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT_ENV,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiration_in: process.env.JWT_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET_KEY,
    refresh_expiration_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  // jwt_cookie_name: process.env.JWT_COOKIE_NAME,
  // jwt_cookie_domain: process.env.JWT_COOKIE_DOMAIN,
  redis: {
    url: process.env.REDIS_URL,
    expires_in: process.env.REDIS_TOKEN_EXPIRES_IN,
  },
  resetlink: process.env.RESET_PASS_UI_LINK,
  email: process.env.EMAIL,
  appPass: process.env.APP_PASS,
}
