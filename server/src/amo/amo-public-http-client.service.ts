import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmoCrmPublicHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly config: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: `https://${this.config.getOrThrow('AMO_REFERER_URI')}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async post<Response, Body>(
    endpoint: string,
    body: Body,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    const { data } = await this.axiosInstance.post<Response>(endpoint, body, config);
    return data;
  }
}
