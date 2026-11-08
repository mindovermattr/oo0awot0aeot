import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmoTokenEntity } from '../amo-token.entity.js';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(AmoTokenEntity)
    private readonly repo: Repository<AmoTokenEntity>,
  ) {}

  save(values: Partial<AmoTokenEntity>) {
    return this.repo.save(values);
  }

  async getFirst() {
    const [token] = await this.repo.find({ order: { updatedAt: 'DESC' }, take: 1 });

    if (!token) return null;

    return token;
  }

  async updateByReferer(referer: string, values: Partial<AmoTokenEntity>) {
    await this.repo.update({ referer }, values);

    const updated = await this.repo.findOneBy({ referer });

    return updated;
  }
}
