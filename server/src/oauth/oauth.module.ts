import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller.js';
import { OauthService } from './oauth.service.js';
import { AmoModule } from '../amo/amo.module.js';

@Module({
  imports: [AmoModule],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
