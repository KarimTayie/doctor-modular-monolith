import { Injectable } from '@nestjs/common';
import { AppLogger } from '@Shared/logger/logger.service';
import { RequestContext } from '@Shared/request-context/request-context.dto';
import { plainToClass } from 'class-transformer';

import { SlotRepository } from '../../internal/data/repositories/slot.repository';
import { SlotOutput } from '../dtos/slot-output.dto';
import { ISlotAPIs } from '../interfaces/slot-apis.interface';

@Injectable()
export class SlotAPIs implements ISlotAPIs {
  constructor(
    private repository: SlotRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(SlotAPIs.name);
  }

  async getAvailableSlots(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ slots: SlotOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getAvailableSlots.name} was called`);

    const [slots, count] = await this.repository.findAndCount({
      where: { isReserved: false },
      take: limit,
      skip: offset,
    });

    const slotsOutput = plainToClass(SlotOutput, slots, {
      excludeExtraneousValues: true,
    });

    return { slots: slotsOutput, count };
  }

  async isSlotFree(ctx: RequestContext, slotId: string): Promise<boolean> {
    this.logger.log(ctx, `${this.isSlotFree.name} was called`);

    return await this.repository.exists({
      where: { id: slotId, isReserved: false },
    });
  }

  async reserveSlot(ctx: RequestContext, slotId: string): Promise<SlotOutput> {
    this.logger.log(ctx, `${this.reserveSlot.name} was called`);

    const slot = await this.repository.getById(slotId);
    slot.isReserved = true;

    const reservedSlot = await this.repository.save(slot);

    const slotOutput = plainToClass(SlotOutput, reservedSlot, {
      excludeExtraneousValues: true,
    });

    return slotOutput;
  }
}
