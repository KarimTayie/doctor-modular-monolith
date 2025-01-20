import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppLogger } from '@Shared/logger/logger.service';

import { AppointmentsGateway } from '../../shell/gateways/appointments-gateway';
import { UpdateAppointmentCommand } from './update-appointment.command';

@CommandHandler(UpdateAppointmentCommand)
export class UpdateAppointmentHandler
  implements ICommandHandler<UpdateAppointmentCommand>
{
  constructor(
    private readonly logger: AppLogger,
    private readonly appointmentsGateway: AppointmentsGateway,
  ) {}

  async execute({
    ctx,
    appointmentId,
    status,
  }: UpdateAppointmentCommand): Promise<any> {
    this.logger.log(ctx, `${this.execute.name} was called`);

    return await this.appointmentsGateway.updateAppointment(
      ctx,
      appointmentId,
      { status },
    );
  }
}
