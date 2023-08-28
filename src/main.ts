import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  const config = app.get<ConfigService>(ConfigService);
  const frontEndBaseUrl: string = config.get('Rashak_Frontend_URL');
  const baseUrlPrefix = `${config.get<string>('URL_PREFIX')}`;
  // const baseUrl: string | URL = config.get('Base_URL');

  //solves the problem of cors and cookies in the header
  app.use(cookieParser());
  app.enableCors({
    origin: frontEndBaseUrl, //The origin should be at the same origin the frontend is running on
    credentials: true, //This helps enable the passing of cookies to the frontend
  });

  //this is the pipe that helps to validates all inputs/payloads/dto to
  //accept only the specified property in the dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix(`${baseUrlPrefix}/`);

  const configService = app.get(ConfigService);

  await app.listen(
    configService.get('PORT') ? parseInt(process.env.PORT) : 8000,
  );
}
bootstrap();
