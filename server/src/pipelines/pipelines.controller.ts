import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PipelinesService } from './pipelines.service.js';
import { PipelineResponseDto } from './dto/amo-pipelines.dto.js';

@ApiTags('pipelines')
@Controller('pipelines')
export class PipelinesController {
  constructor(private readonly pipelinesService: PipelinesService) {}

  @Get()
  @ApiOperation({ summary: 'Список воронок amoCRM' })
  @ApiOkResponse({ type: [PipelineResponseDto] })
  findAll() {
    return this.pipelinesService.findAll();
  }
}
