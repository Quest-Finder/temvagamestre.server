import { type INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const swaggerSetup = (app: INestApplication<any>): void => {
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
}
