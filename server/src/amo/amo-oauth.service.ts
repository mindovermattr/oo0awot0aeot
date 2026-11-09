import { Injectable } from '@nestjs/common';
import { AmoTokenRequestDto, AmoTokenResponseDto } from './contracts/index.js';
import { ConfigService } from '@nestjs/config';
import { OauthGateway } from './gateways/oauth.gateway.js';
import { TokenRepository } from './database/repositories/amo-token.repository.js';
import { EnvSchema } from '../env.schema.js';

@Injectable()
export class AmoOAuthService {
  constructor(
    private readonly config: ConfigService<EnvSchema, true>,
    private readonly tokenRepository: TokenRepository,
    private readonly oauthGateway: OauthGateway,
  ) {}

  private async updateToken(token: AmoTokenResponseDto) {
    const referer = this.config.getOrThrow<string>('AMO_REFERER_URI');
    const mappedValues = {
      tokenType: token.token_type,
      accessToken: token.access_token,
      expiresAt: new Date(Date.now() + token.expires_in * 1000),
      refreshToken: token.refresh_token,
      referer: referer,
    };

    const dbToken = await this.tokenRepository.getFirst();
    if (!dbToken) return this.tokenRepository.save(mappedValues);

    return this.tokenRepository.updateByReferer(referer, mappedValues);
  }

  async createTokenWithCode(code: string) {
    const body: AmoTokenRequestDto = {
      client_id: this.config.getOrThrow<string>('AMO_CLIENT_ID'),
      client_secret: this.config.getOrThrow<string>('AMO_CLIENT_SECRET'),
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.config.getOrThrow<string>('AMO_REDIRECT_URI'),
    };

    const token = await this.oauthGateway.getAccessToken(body);

    if (!token) return null;

    return this.updateToken(token);
  }

  async createNewTokenWithRefresh() {
    const dbToken = await this.tokenRepository.getFirst();

    if (!dbToken) return null;

    const body: AmoTokenRequestDto = {
      grant_type: 'refresh_token',
      client_id: this.config.getOrThrow<string>('AMO_CLIENT_ID'),
      client_secret: this.config.getOrThrow<string>('AMO_CLIENT_SECRET'),
      redirect_uri: this.config.getOrThrow<string>('AMO_REDIRECT_URI'),
      refresh_token: dbToken.refreshToken,
    };

    const token = await this.oauthGateway.getAccessToken(body);

    if (!token) return null;

    return this.updateToken(token);
  }
}
