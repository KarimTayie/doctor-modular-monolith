import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppLogger } from '@Shared/logger/logger.service';

import { SlotOutput } from '../../../../doctor-availability/shared/dtos/slot-output.dto';
import { GetAvailableSlotsQuery } from '../../application/queries/get-available-slots.query';
import { SlotsGateway } from '../gateways/slots-gateway';

@QueryHandler(GetAvailableSlotsQuery)
export class GetAvailableSlotsHandler
  implements
    IQueryHandler<
      GetAvailableSlotsQuery,
      { slots: SlotOutput[]; count: number }
    >
{
  constructor(
    private readonly slotsGateway: SlotsGateway,
    private readonly logger: AppLogger,
  ) {}

  async execute({
    ctx,
    limit,
    offset,
  }: GetAvailableSlotsQuery): Promise<{ slots: SlotOutput[]; count: number }> {
    this.logger.log(ctx, `${this.execute.name} was called`);

    return this.slotsGateway.getAvailableSlots(ctx, limit, offset);
  }
}
