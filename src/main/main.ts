import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import env from './configs/env'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })
  await app.listen(env.serverPort, env.serverHost)
  console.log(`Server running at http://${env.serverHost}:${env.serverPort}`)
}

bootstrap()
  .catch(console.error)
