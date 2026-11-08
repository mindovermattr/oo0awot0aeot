import { Injectable } from '@nestjs/common';
import { AmoService } from '../amo/amo.service.js';

@Injectable()
export class PipelinesService {
  constructor(private readonly amo: AmoService) {}

  async findAll() {
    const loadedPipelines = await this.amo.fetchPipelines();

    const pipelines = loadedPipelines?._embedded.pipelines ?? [];

    return pipelines.map((pipeline) => ({
      id: pipeline.id,
      pipelineName: pipeline.name,
      statuses: pipeline._embedded.statuses.map((status) => ({
        id: status.id,
        name: status.name,
        type: status.type,
      })),
    }));
  }
}
