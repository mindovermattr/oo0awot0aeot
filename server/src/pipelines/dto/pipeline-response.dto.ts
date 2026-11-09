import { ApiProperty } from '@nestjs/swagger';
import { AmoCrmPipelineStatusDto } from '../../amo/contracts/index.js';

export class PipelineResponseDto {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  pipelineName!: string;
  @ApiProperty({ type: [AmoCrmPipelineStatusDto] })
  statuses!: AmoCrmPipelineStatusDto[];
}
