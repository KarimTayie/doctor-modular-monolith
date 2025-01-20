import { SlotOutput } from '@DoctorAvailability/shared/dtos/slot-output.dto';
import { ISlotAPIs } from '@DoctorAvailability/shared/interfaces/slot-apis.interface';
import { Inject, Injectable } from '@nestjs/common';
import { RequestContext } from '@Shared/request-context/request-context.dto';

@Injectable()
export class SlotsGateway {
  constructor(@Inject(ISlotAPIs) private readonly slotsAPI: ISlotAPIs) {}

  async getAvailableSlots(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ slots: SlotOutput[]; count: number }> {
    return await this.slotsAPI.getAvailableSlots(ctx, limit, offset);
  }

  async isSlotFree(ctx: RequestContext, slotId: string): Promise<boolean> {
    return await this.slotsAPI.isSlotFree(ctx, slotId);
  }

  async reserveSlot(ctx: RequestContext, slotId: string): Promise<SlotOutput> {
    return await this.slotsAPI.reserveSlot(ctx, slotId);
  }
}
