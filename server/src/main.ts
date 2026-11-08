import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyPluginAsync } from 'fastify';
import { OpenAPIV3 } from 'openapi-types';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env['CLIENT_ORIGIN'] ?? 'http://localhost:5173',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Amo api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  await app.register(fastifySwagger, {
    mode: 'static',
    specification: { document: document satisfies OpenAPIV3.Document },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: '/api/docs',
  });

  const plugin: FastifyPluginAsync = async (instance) => {
    instance.get('/api-json', async (_req, reply) => {
      reply.type('application/json').send(document);
    });
  };

  await app.register(plugin);

  await app.listen(process.env['PORT'] ?? 3000, '0.0.0.0');
}

void bootstrap();
