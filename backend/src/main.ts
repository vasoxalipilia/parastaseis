import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieSession from 'cookie-session';
import * as cookieParser from 'cookie-parser'; // Import cookie-parser
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

// Load environment variables from .env
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //     // cookie: {
  //     //   maxAge: parseInt(process.env.MAX_AGE),
  //     // },
  //   }),
  // );

  app.use(cookieParser());

  const configService = app.get(ConfigService);

  app.use(
    cookieSession({
      name: 'session', // Cookie name
      secret: configService.get<string>('COOKIE_SECRET'),
      // maxAge: 24 * 60 * 60 * 1000, // Cookie expiration (1 day)
      maxAge: 1 * 60 * 60 * 1000, // Cookie expiration (1 hour)
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'static'));

  app.enableCors({
    origin: '*',
    // origin: 'parastaseis.webroom.gr',
    methods: 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    allowedHeaders:
      'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, enctype',
    credentials: true,
  });
  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
