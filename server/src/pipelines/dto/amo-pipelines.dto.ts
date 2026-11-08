import { ApiProperty } from '@nestjs/swagger';

export class AmoCrmPipelineStatusDto {
  @ApiProperty({ example: 142 })
  id!: number;

  @ApiProperty({ example: 'Неразобранное' })
  name!: string;

  @ApiProperty({ example: 0 })
  sort!: number;

  @ApiProperty({
    example: 1,
    description: 'Тип этапа (0 — обычный, 1 — успешный, 2 — провал)',
  })
  type!: number;
}

export class AmoCrmPipelineStatusesEmbeddedDto {
  @ApiProperty({ type: [AmoCrmPipelineStatusDto] })
  statuses!: AmoCrmPipelineStatusDto[];
}

export class AmoCrmPipelineDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Воронка продаж' })
  name!: string;

  @ApiProperty({ type: AmoCrmPipelineStatusesEmbeddedDto })
  _embedded!: AmoCrmPipelineStatusesEmbeddedDto;
}

export class AmoCrmPipelinesEmbeddedDto {
  @ApiProperty({ type: [AmoCrmPipelineDto] })
  pipelines!: AmoCrmPipelineDto[];
}

export class AmoCrmPipelinesResponseDto {
  @ApiProperty({ type: AmoCrmPipelinesEmbeddedDto })
  _embedded!: AmoCrmPipelinesEmbeddedDto;
}

export class PipelineResponseDto {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  pipelineName!: string;
  @ApiProperty({ type: [AmoCrmPipelineStatusDto] })
  statuses!: AmoCrmPipelineStatusDto[];
}
