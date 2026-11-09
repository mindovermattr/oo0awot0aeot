import { ApiProperty } from '@nestjs/swagger';

export class UserMappedResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;
}
