import { type INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { bodyParser } from '../middlewares/body-parser/body-parser'

const createApp = async (): Promise<INestApplication<any>> => {
  const app = await NestFactory.create(AppModule)
  app.use(bodyParser)
  return app
}

export default createApp
