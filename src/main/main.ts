import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import env from './configs/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

const mongoConnect = async (): Promise<void> => {
  await MongoHelper.connect(env.mongoDbUri)
}

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })

  const config = new DocumentBuilder()
    .setTitle('Tem Vaga Mestre?')
    .setVersion('0.0.1')
    .addTag('Fake-User')
    .addTag('SignUp-Clerk')
    .addTag('User')
    .addTag('User-Preference')
    .addTag('Social-Media')
    .addTag('User-Social-Media')
    .addTag('Rpg-Style')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(env.port)
  console.log(`Server running at: ${await app.getUrl()}`)
}
mongoConnect().catch(console.error)
bootstrap().catch(console.error)
