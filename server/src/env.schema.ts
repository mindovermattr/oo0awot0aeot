export interface EnvSchema {
  NODE_ENV: 'development' | 'production' | 'stage' | 'test';
  PORT: number;
  CORS_ORIGIN: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  AMO_CLIENT_ID: string;
  AMO_CLIENT_SECRET: string;
  AMO_REDIRECT_URI: string;
  AMO_REFERER_URI: string;
}
