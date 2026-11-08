import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { AmoUserMappedResponseDto } from './dto/amo-users.dto.js';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Список пользователей amoCRM' })
  @ApiOkResponse({ type: [AmoUserMappedResponseDto] })
  findAll() {
    return this.usersService.findAll();
  }
}
