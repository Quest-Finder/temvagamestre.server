import dotenv from 'dotenv'

dotenv.config()

export default {
  webhookSecret: process.env.WEBHOOK_SECRET ?? 'any_webhook_secret',
  serverPort: process.env.SERVER_PORT ?? '5050',
  serverHost: process.env.SERVER_HOST ?? 'localhost',
  clerkJwtSecretKey: process.env.CLERK_JWT_SECRET_KEY ?? 'any_clerk_jwt_secret_key'
}
