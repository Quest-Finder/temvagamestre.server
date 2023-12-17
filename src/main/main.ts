import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`Server running smoothly...`);
}

bootstrap().catch(console.error);
