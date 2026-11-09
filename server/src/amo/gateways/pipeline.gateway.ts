import { Injectable } from '@nestjs/common';
import { AmoCrmHttpClient } from '../amo-http-client.service.js';
import { AmoCrmPipelinesResponseDto } from '../contracts/index.js';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class PipelineGateway {
  constructor(private readonly httpClient: AmoCrmHttpClient) {}

  async findAll(config?: AxiosRequestConfig): Promise<AmoCrmPipelinesResponseDto | null> {
    return this.httpClient.get<AmoCrmPipelinesResponseDto | null>(
      `/api/v4/leads/pipelines`,
      config,
    );
  }
}
