import { Module } from '@nestjs/common';
import { TableService } from './table.service.js';
import { TableController } from './table.controller.js';
import { LeadsModule } from '../leads/leads.module.js';
import { UsersModule } from '../users/users.module.js';
import { PipelinesModule } from '../pipelines/pipelines.module.js';

@Module({
  imports: [LeadsModule, UsersModule, PipelinesModule],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
