import { RequestContext } from '@Shared/request-context/request-context.dto';

import { SlotOutput } from '../dtos/slot-output.dto';

export interface ISlotAPIs {
  getAvailableSlots(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ slots: SlotOutput[]; count: number }>;

  isSlotFree(ctx: RequestContext, slotId: string): Promise<boolean>;

  reserveSlot(ctx: RequestContext, slotId: string): Promise<SlotOutput>;
}

export const ISlotAPIs = Symbol('ISlotAPIs');
