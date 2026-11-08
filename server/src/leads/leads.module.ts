import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller.js';
import { LeadsService } from './leads.service.js';
import { AmoModule } from '../amo/amo.module.js';

@Module({
  imports: [AmoModule],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
