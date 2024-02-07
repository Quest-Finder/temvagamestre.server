import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import env from './configs/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

const mongoConnect = async (): Promise<void> => {
  await MongoHelper.connect(env.mongoDbUri)
}

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })
  await app.listen(env.port)
  console.log(`Server running at: ${await app.getUrl()}`)
}
mongoConnect().catch(console.error)
bootstrap().catch(console.error)
