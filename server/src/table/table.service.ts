import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { PipelinesService } from '../pipelines/pipelines.service.js';
import { LeadsService } from '../leads/leads.service.js';
import { GetFiltredLeadsDto } from '../leads/dto/get-filtred-leads.dto.js';

@Injectable()
export class TableService {
  constructor(
    private readonly usersService: UsersService,
    private readonly pipelinesService: PipelinesService,
    private readonly leadsService: LeadsService,
  ) {}

  async getFilteredTable(filterQuery: GetFiltredLeadsDto) {
    const [loadedLeads, loadedUsers, loadedPipelines] = await Promise.all([
      this.leadsService.findAll(1, 50),
      this.usersService.findAll(),
      this.pipelinesService.findAll(),
    ]);

    const filteredLeads = this.leadsService.filter(filterQuery, loadedLeads);

    const mappedLeads = filteredLeads.map((lead) => {
      const pipeline = loadedPipelines.find((p) => p.id === lead.pipeline_id);
      const userName = loadedUsers.find((user) => user.id === lead.responsible_user_id)?.name;
      return {
        ...lead,
        statusName: pipeline?.statuses.find((apiStatus) => apiStatus.id === lead.status_id)?.name,
        pipelineName: pipeline?.pipelineName,
        responsibleUserName: userName,
      };
    });

    return mappedLeads;
  }
}
