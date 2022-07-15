import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

const corsOptions = (req, callback) => {
  const corsOptions = {
    origin: false as boolean | string | string[],
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  };

  if (process.env.NODE_ENV === 'dev') {
    corsOptions.origin = '*';
  } else {
    corsOptions.origin = [process.env.FRONTEND_BASE_URL];
  }

  callback(null, corsOptions);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors(corsOptions);
  app.use(passport.initialize());
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const configService = app.get(ConfigService);

  await app.listen(configService.get('port'));
}

bootstrap();
