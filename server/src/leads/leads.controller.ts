import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LeadsService } from './leads.service.js';
import { LeadDto } from './dto/lead.dto.js';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @ApiOperation({ summary: 'Список лидов' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Номер страницы (начиная с 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 50,
    description: 'Размер страницы',
  })
  @ApiOkResponse({ type: [LeadDto] })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.leadsService.findAll(page, limit);
  }
}
