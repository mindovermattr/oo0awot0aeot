import { ApiProperty } from '@nestjs/swagger';
import { LeadLinksDto } from '../../leads/dto/lead.dto.js';

export class TableLeadDto {
  @ApiProperty({ example: 123 })
  id!: number;

  @ApiProperty({ example: 'Новая сделка' })
  name!: string;

  @ApiProperty({ example: 10000 })
  price!: number;

  @ApiProperty({ example: 1735689600, description: 'Unix timestamp (сек)' })
  created_at!: number;

  @ApiProperty({ example: 142 })
  status_id!: number;

  @ApiProperty({ example: 1 })
  pipeline_id!: number;

  @ApiProperty()
  responsible_user_id!: number;

  @ApiProperty({ type: LeadLinksDto })
  _links!: LeadLinksDto;

  @ApiProperty({ example: 'Первичный контакт', required: false })
  statusName?: string;

  @ApiProperty({ example: 'Основная воронка', required: false })
  pipelineName?: string;

  @ApiProperty({ example: 'Иван Иванов', required: false })
  responsibleUserName?: string;
}
