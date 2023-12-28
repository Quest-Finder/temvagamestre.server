import dotenv from 'dotenv'

dotenv.config()

export default {
  webhookSecret: process.env.WEBHOOK_SECRET ?? 'any_webhook_secret',
  port: process.env.PORT ?? '5050',
  clerkJwtSecretKey: process.env.CLERK_JWT_SECRET_KEY ?? 'any_clerk_jwt_secret_key'
}
