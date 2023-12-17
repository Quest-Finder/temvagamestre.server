import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config';

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const port = app.get(ConfigService).get<number>('PORT') || 3000;
  await app.listen(port);
}

bootstrap()
  .catch(console.error)
