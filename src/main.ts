import { NestFactory } from '@nestjs/core'
import session from 'express-session'
import { AppModule } from './app.module'
import env from './configs/env'
import { swaggerSetup } from './configs/swagger/swagger-setup'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })
  app.use(
    session({
      secret: env.secretKeySession,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60
      }
    })
  )
  swaggerSetup(app)
  await app.listen(env.port)
  console.log(`Server running at: ${await app.getUrl()}`)
}

bootstrap().catch(console.error)
