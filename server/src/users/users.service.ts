import { Injectable } from '@nestjs/common';
import { AmoService } from '../amo/amo.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly amo: AmoService) {}

  async findAll() {
    const loadedUsers = await this.amo.fetchUsers();

    const users = loadedUsers?._embedded.users ?? [];

    return users.map((user) => ({
      id: user.id,
      name: user.name,
    }));
  }
}
