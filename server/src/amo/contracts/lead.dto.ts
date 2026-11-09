import { ApiProperty } from '@nestjs/swagger';

class LeadSelfLinkDto {
  @ApiProperty({ example: 'https://api.amocrm.ru/api/v4/leads/123' })
  href!: string;
}

export class LeadLinksDto {
  @ApiProperty({ type: LeadSelfLinkDto })
  self!: LeadSelfLinkDto;
}

export class LeadDto {
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
}

class LeadEmbeddedDto {
  @ApiProperty({ type: [LeadDto] })
  leads!: LeadDto[];
}

export class LeadResponseDto {
  @ApiProperty({ type: LeadEmbeddedDto })
  _embedded!: LeadEmbeddedDto;
}
