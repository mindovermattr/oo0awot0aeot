import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TableService } from './table.service.js';
import { TableLeadDto } from './dto/get-filtered-table.dto.js';
import { GetFiltredLeadsDto } from '../leads/dto/get-filtred-leads.dto.js';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @ApiOperation({ summary: 'Получение таблицы сделок с фильтрами' })
  @ApiBody({ type: GetFiltredLeadsDto })
  @ApiOkResponse({ type: [TableLeadDto] })
  getFilteredTable(@Body() createTableDto: GetFiltredLeadsDto) {
    return this.tableService.getFilteredTable(createTableDto);
  }
}
