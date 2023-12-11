import { type INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { cors } from '../middlewares'

const createApp = async (): Promise<INestApplication<any>> => {
  const app = await NestFactory.create(AppModule)
  app.use(cors)
  return app
}

export default createApp
