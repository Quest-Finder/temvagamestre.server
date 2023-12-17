import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import dotenv from "dotenv";
dotenv.config();
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  console.log(`Server running`);
}

bootstrap().catch(console.error);
