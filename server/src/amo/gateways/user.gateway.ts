import { Injectable } from '@nestjs/common';
import { AmoCrmHttpClient } from '../amo-http-client.service.js';
import { AmoUserResponseDto } from '../contracts/index.js';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class UserGateway {
  constructor(private readonly httpClient: AmoCrmHttpClient) {}

  async findAll(config?: AxiosRequestConfig): Promise<AmoUserResponseDto | null> {
    return this.httpClient.get<AmoUserResponseDto | null>(`/api/v4/users`, config);
  }
}
