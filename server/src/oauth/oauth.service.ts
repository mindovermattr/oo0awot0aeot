import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { AmoService } from '../amo/amo.service.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OauthService {
  constructor(
    private readonly amo: AmoService,
    private readonly config: ConfigService,
  ) {}

  async exchangeCode(code: string) {
    return this.amo.getAccessToken(code);
  }

  authorize() {
    const state = randomBytes(32).toString('base64url');
    const clientId = this.config.getOrThrow<string>('AMO_CLIENT_ID');

    return { state, clientId };
  }
}
