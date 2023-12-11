import { type INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'

const createApp = async (): Promise<INestApplication<any>> => {
  return await NestFactory.create(AppModule)
}

export default createApp
