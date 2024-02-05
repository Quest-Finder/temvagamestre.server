import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import env from './configs/env'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })
  await app.listen(env.port)
  console.log(`Server running at: ${await app.getUrl()}`)
}

bootstrap().catch(console.error)
