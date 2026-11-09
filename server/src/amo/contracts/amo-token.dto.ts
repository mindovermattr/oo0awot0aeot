import { ApiProperty } from '@nestjs/swagger';

export class AmoTokenResponseDto {
  @ApiProperty()
  token_type!: 'Bearer';
  @ApiProperty()
  expires_in!: number;
  @ApiProperty()
  access_token!: string;
  @ApiProperty()
  refresh_token!: string;
}

class AmoTokenBaseDto {
  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  client_id!: string;

  @ApiProperty({ example: 'super-secret-value' })
  client_secret!: string;

  @ApiProperty({ example: 'https://example.com/callback' })
  redirect_uri!: string;
}

class AmoAuthCodeTokenRequestDto extends AmoTokenBaseDto {
  @ApiProperty({ enum: ['authorization_code'], example: 'authorization_code' })
  grant_type!: 'authorization_code';

  @ApiProperty({ example: 'def50200abc...' })
  code!: string;
}

class AmoRefreshTokenRequestDto extends AmoTokenBaseDto {
  @ApiProperty({ enum: ['refresh_token'], example: 'refresh_token' })
  grant_type!: 'refresh_token';

  @ApiProperty({ example: 'def50200def...' })
  refresh_token!: string;
}

export type AmoTokenRequestDto = AmoAuthCodeTokenRequestDto | AmoRefreshTokenRequestDto;
