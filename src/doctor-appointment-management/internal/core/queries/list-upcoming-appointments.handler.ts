import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppLogger } from '@Shared/logger/logger.service';

import { AppointmentsGateway } from '../../shell/gateways/appointments-gateway';
import { ListUpcomingAppointmentsQuery } from './list-upcoming-appointments.query';

@QueryHandler(ListUpcomingAppointmentsQuery)
export class ListUpcomingAppointmentsHandler
  implements IQueryHandler<ListUpcomingAppointmentsQuery>
{
  constructor(
    private readonly logger: AppLogger,
    private readonly appointmentsGateway: AppointmentsGateway,
  ) {}

  async execute({
    ctx,
    limit,
    offset,
  }: ListUpcomingAppointmentsQuery): Promise<any> {
    this.logger.log(ctx, `${this.execute.name} was called`);

    return await this.appointmentsGateway.getUpcomingAppointments(
      ctx,
      limit,
      offset,
    );
  }
}
