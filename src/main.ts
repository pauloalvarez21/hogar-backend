import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  const envFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
  config({ path: envFile, override: true });
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
