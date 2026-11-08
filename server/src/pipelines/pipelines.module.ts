import { Module } from '@nestjs/common';
import { PipelinesController } from './pipelines.controller.js';
import { PipelinesService } from './pipelines.service.js';
import { AmoModule } from '../amo/amo.module.js';

@Module({
  imports: [AmoModule],
  controllers: [PipelinesController],
  providers: [PipelinesService],
  exports: [PipelinesService],
})
export class PipelinesModule {}
