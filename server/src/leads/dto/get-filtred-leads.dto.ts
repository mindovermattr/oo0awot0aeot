import { ApiProperty } from '@nestjs/swagger';

export class GetFiltredLeadsDto {
  @ApiProperty()
  leadIds!: number[];

  @ApiProperty()
  userIds!: number[];

  @ApiProperty()
  pipelineIds!: number[];
}
