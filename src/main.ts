import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import multipart from 'fastify-multipart';
import path from 'path';

const SWAGGER_API_ROOT = 'api/docs';
const SWAGGER_API_NAME = 'API';
const SWAGGER_API_DESCRIPTION = 'API Description';
const SWAGGER_API_CURRENT_VERSION = '1.0';
const globalPrefix = '/api';

async function bootstraper() {
  const logger = new Logger('Main', { timestamp: true });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: false }));

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errMsg = {};
        validationErrors.forEach((er) => {
          if (er?.property && er?.constraints) {
            errMsg[er.property] = Object.values(er.constraints).join(', ').trim();
          } else {
            er.children.forEach((er2) => {
              er2.children.forEach((err3) => {
                errMsg[err3.property] = Object.values(err3.constraints).join(', ').trim();
              });
            });
          }
        });
        return new BadRequestException(errMsg);
      },
    }),
  );
  app.useStaticAssets({
    root: path.join(__dirname, '../upload/'),
    prefix: '/public',
    dotfiles: 'deny',
  });

  app.register(multipart, {
    limits: {
      fileSize: Math.pow(2, 20) * 10, // For multipart forms, the max file size in bytes
      files: 10, // Max number of file fields
    },
    attachFieldsToBody: true,
    addToBody: true,
  });

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  await app.listen(3000, '0.0.0.0', (err, addr) => {
    if (err) throw err;
    logger.log(`Listening to ${addr}${globalPrefix}`);
  });
}

bootstraper();
