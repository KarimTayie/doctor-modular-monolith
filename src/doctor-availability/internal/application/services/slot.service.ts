import { Injectable } from '@nestjs/common';
import { AppLogger } from '@Shared/logger/logger.service';
import { RequestContext } from '@Shared/request-context/request-context.dto';
import { plainToClass } from 'class-transformer';

import { AddSlotDto } from '../../../shared/dtos/slot-input.dto';
import { SlotOutput } from '../../../shared/dtos/slot-output.dto';
import { Doctor } from '../../data/entities/doctor.entity';
import { Slot } from '../../data/entities/slot.entity';
import { SlotRepository } from '../../data/repositories/slot.repository';
import { DoctorService } from './doctor.service';

@Injectable()
export class SlotService {
  constructor(
    private repository: SlotRepository,
    private doctorService: DoctorService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(SlotService.name);
  }

  async listSlots(ctx: RequestContext, limit: number, offset: number) {
    this.logger.log(ctx, `${this.listSlots.name} was called`);

    this.logger.log(ctx, `calling ${SlotRepository.name}.findAndCount`);
    const [slots, count] = await this.repository.findAndCount({
      take: limit,
      skip: offset,
    });

    const slotsOutput = plainToClass(SlotOutput, slots, {
      excludeExtraneousValues: true,
    });

    return { slots: slotsOutput, count };
  }

  async createSlot(ctx: RequestContext, input: AddSlotDto) {
    this.logger.log(ctx, `${this.createSlot.name} was called`);

    const slot = plainToClass(Slot, input);

    this.logger.log(ctx, `calling ${SlotRepository.name}.save`);
    const savedSlot = await this.repository.save(slot);

    return plainToClass(SlotOutput, savedSlot, {
      excludeExtraneousValues: true,
    });
  }

  async getSlotById(ctx: RequestContext, slotId: string) {
    this.logger.log(ctx, `${this.getSlotById.name} was called`);

    this.logger.log(ctx, `calling ${SlotRepository.name}.getById`);
    const slot = await this.repository.getById(slotId);

    return plainToClass(SlotOutput, slot, {
      excludeExtraneousValues: true,
    });
  }
}
