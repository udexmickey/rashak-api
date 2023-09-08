import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

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

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const configService = app.get(ConfigService);

  //Swagger functionality injection
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rashak API/Server Documentation')
    .setDescription(
      'Rashak is an innovative agri tech company with a mission to empower smallholder farmers by facilitating their access to vital markets, financial services, and data-driven support. Through its comprehensive platform, Rashak aims to revolutionize the agricultural landscape, ensuring sustainable growth for farmers and contributing to food security and economic development.',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'Auth-Guard',
    )
    .addSecurityRequirements('Auth-Guard')
    .setVersion('1.0')
    .build();

  //ensure this swaggerDocumentOptions line of code comes before the app.setGlobalPrefix(),
  //to avoid repeatition of the prefix on the routes on swaggerUi
  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    deepScanRoutes: false,
  };

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerDocumentOptions,
  );

  SwaggerModule.setup(`${baseUrlPrefix}/docs`, app, document, {
    customfavIcon: 'https://rashak-client.vercel.app/favicon.ico', //adding our favicon to swagger
    customSiteTitle: 'Rashak-api Docs', //add site title to swagger for nice SEO
    customCss: `
      .topbar-wrapper img {content:url(\'https://rashak-client.vercel.app/_next/static/media/rashak-logo-svg.5ffc6a58.svg/'); width:200px; height:auto;}
      .swagger-ui .topbar { background-color: #f1f2f1; } `,
    swaggerOptions: {
      persistAuthorization: true, // this helps to retain the token even after refreshing the (swagger UI web page)
      // swaggerOptions: { defaultModelsExpandDepth: -1 } //uncomment this line to stop seeing the schema on swagger ui
    },
  });

  await app.listen(
    configService.get('PORT') ? parseInt(process.env.PORT) : 8000,
  );
}
bootstrap();
