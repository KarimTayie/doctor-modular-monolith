import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Slot } from '../entities/slot.entity';

@Injectable()
export class SlotRepository extends Repository<Slot> {
  constructor(private dataSource: DataSource) {
    super(Slot, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<Slot> {
    const slot = await this.findOne({ where: { id } });
    if (!slot) {
      throw new NotFoundException();
    }

    return slot;
  }
}
