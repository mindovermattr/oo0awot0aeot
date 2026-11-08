import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module.js';
import { OauthModule } from './oauth/oauth.module.js';
import { UsersModule } from './users/users.module.js';
import { PipelinesModule } from './pipelines/pipelines.module.js';
import { AmoModule } from './amo/amo.module.js';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvSchema } from './env.schema.js';
import { AmoTokenEntity } from './amo/database/amo-token.entity.js';
import { TableModule } from './table/table.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AMO_CLIENT_SECRET: Joi.string().required(),
        AMO_CLIENT_ID: Joi.string().required(),
        AMO_REDIRECT_URI: Joi.string().uri().required(),
        AMO_REFERER_URI: Joi.string().required(),

        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().integer().default(5432),
        DB_DATABASE: Joi.string().required(),

        PORT: Joi.number().integer().default(3000),
        CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'stage', 'test')
          .default('development'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvSchema, true>) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: config.getOrThrow<number>('DB_PORT'),
        username: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_DATABASE'),
        entities: [AmoTokenEntity],
        synchronize: false,
      }),
    }),
    HttpModule.register({
      global: true,
      timeout: 5000,
      maxRedirects: 5,
    }),
    OauthModule,
    LeadsModule,
    UsersModule,
    PipelinesModule,
    AmoModule,
    TableModule,
  ],
})
export class AppModule {}
