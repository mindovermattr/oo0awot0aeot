import { Module } from '@nestjs/common';
import { AmoService } from './amo.service.js';
import { LeadGateway, OauthGateway, PipelineGateway, UserGateway } from './gateways/index.js';
import { AmoCrmHttpClient } from './amo-http-client.service.js';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmoTokenEntity } from './database/amo-token.entity.js';
import { AmoOAuthService } from './amo-oauth.service.js';
import { TokenRepository } from './database/repositories/amo-token.repository.js';
import { AmoCrmPublicHttpClient } from './amo-public-http-client.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([AmoTokenEntity]), ConfigModule],
  providers: [
    AmoService,
    PipelineGateway,
    LeadGateway,
    UserGateway,
    AmoCrmHttpClient,
    AmoCrmPublicHttpClient,
    AmoOAuthService,
    OauthGateway,
    TokenRepository,
  ],
  exports: [AmoService],
})
export class AmoModule {}
