import { Injectable } from '@nestjs/common';
import { AmoService } from '../amo/amo.service.js';
import { GetFiltredLeadsDto } from './dto/get-filtred-leads.dto.js';
import { LeadDto } from './dto/lead.dto.js';

@Injectable()
export class LeadsService {
  constructor(private readonly amo: AmoService) {}

  async findAll(page = 1, limit = 50) {
    const loadedLeads = await this.amo.fetchLeads({
      params: { page: Math.max(page, 1), limit: Math.min(Math.max(limit, 1), 250) },
    });

    if (!loadedLeads) return [];

    const leads = loadedLeads._embedded.leads;

    return leads;
  }

  filter(filterQuery: GetFiltredLeadsDto, leads: LeadDto[]) {
    const filtredLeads = leads.filter(
      (lead) =>
        (!filterQuery.leadIds.length || filterQuery.leadIds.includes(lead.id)) &&
        (!filterQuery.pipelineIds.length || filterQuery.pipelineIds.includes(lead.pipeline_id)) &&
        (!filterQuery.userIds.length || filterQuery.userIds.includes(lead.responsible_user_id)),
    );

    return filtredLeads;
  }
}
