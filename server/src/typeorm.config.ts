import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AmoTokenEntity } from './amo/database/amo-token.entity.js';

export const dataSource = new DataSource({
  type: 'postgres',
  port: Number(process.env['DB_PORT'] ?? 5432),
  host: process.env['DB_HOST'] ?? 'localhost',
  username: process.env['DB_USERNAME'] ?? 'postgres',
  password: process.env['DB_PASSWORD'] ?? '',
  database: process.env['DB_DATABASE'] ?? 'app',
  entities: [AmoTokenEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
