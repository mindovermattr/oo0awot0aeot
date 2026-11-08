import { ApiProperty } from '@nestjs/swagger';

export class OAuthQueryDto {
  @ApiProperty()
  code!: string;
  @ApiProperty()
  state!: string;
  @ApiProperty({ example: '*.amocrm.ru' })
  referer!: string;
  @ApiProperty()
  platform!: string;
}
