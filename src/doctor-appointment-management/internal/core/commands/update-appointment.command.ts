import { RequestContext } from '@Shared/request-context/request-context.dto';

import { AppointmentStatusType } from '../../../../appointment-booking/shared/interfaces/appointment-status.type';

export class UpdateAppointmentCommand {
  constructor(
    public readonly ctx: RequestContext,
    public readonly appointmentId: string,
    public readonly status: AppointmentStatusType,
  ) {}
}
