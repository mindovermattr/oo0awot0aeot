import { ApiProperty } from '@nestjs/swagger';

export class AmoUserDto {
  @ApiProperty({ example: 12345678 })
  id!: number;

  @ApiProperty({ example: 'Иван Иванов' })
  name!: string;
}

export class AmoUserEmbeddedDto {
  @ApiProperty({ type: [AmoUserDto] })
  users!: AmoUserDto[];
}

export class AmoUserResponseDto {
  @ApiProperty({ type: AmoUserEmbeddedDto })
  _embedded!: AmoUserEmbeddedDto;
}

export class AmoUserMappedResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;
}
