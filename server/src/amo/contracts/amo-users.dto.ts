import { ApiProperty } from '@nestjs/swagger';

class AmoUserDto {
  @ApiProperty({ example: 12345678 })
  id!: number;

  @ApiProperty({ example: 'Иван Иванов' })
  name!: string;
}

class AmoUserEmbeddedDto {
  @ApiProperty({ type: [AmoUserDto] })
  users!: AmoUserDto[];
}

export class AmoUserResponseDto {
  @ApiProperty({ type: AmoUserEmbeddedDto })
  _embedded!: AmoUserEmbeddedDto;
}
