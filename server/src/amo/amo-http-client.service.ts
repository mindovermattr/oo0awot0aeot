import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { TokenRepository } from './database/repositories/amo-token.repository.js';
import { AmoOAuthService } from './amo-oauth.service.js';

@Injectable()
export class AmoCrmHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    private readonly config: ConfigService,
    private readonly tokenRepository: TokenRepository,
    private readonly oauthService: AmoOAuthService,
  ) {
    this.axiosInstance = axios.create({
      baseURL: `https://${this.config.getOrThrow('AMO_REFERER_URI')}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = await this.tokenRepository.getFirst();
      config.headers.Authorization = `Bearer ${token?.accessToken}`;

      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: unknown) => {
        if (!isAxiosError(error)) {
          return Promise.reject(error);
        }

        const originalConfig = error.config;

        if (!originalConfig) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401) {
          const token = await this.oauthService.createNewTokenWithRefresh();

          if (!token) return null;

          originalConfig.headers.Authorization = `Bearer ${token.accessToken}`;

          return this.axiosInstance(originalConfig);
        }

        return Promise.reject(error);
      },
    );
  }

  async get<Response>(endpoint: string, config?: AxiosRequestConfig): Promise<Response> {
    const { data } = await this.axiosInstance.get<Response>(endpoint, config);

    return data;
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
