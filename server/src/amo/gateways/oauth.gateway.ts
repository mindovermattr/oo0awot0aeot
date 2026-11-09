import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { AmoTokenRequestDto, AmoTokenResponseDto } from '../contracts/index.js';
import { AmoCrmPublicHttpClient } from '../amo-public-http-client.service.js';

@Injectable()
export class OauthGateway {
  constructor(private readonly httpClient: AmoCrmPublicHttpClient) {}

  async getAccessToken(
    body: AmoTokenRequestDto,
    config?: AxiosRequestConfig,
  ): Promise<AmoTokenResponseDto | null> {
    return this.httpClient.post<AmoTokenResponseDto | null, AmoTokenRequestDto>(
      `/oauth2/access_token`,
      body,
      config,
    );
  }
}
