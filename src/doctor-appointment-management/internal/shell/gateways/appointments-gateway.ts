import { Inject, Injectable } from '@nestjs/common';
import { RequestContext } from '@Shared/request-context/request-context.dto';

import { AppointmentOutput } from '../../../../appointment-booking/internal/api/dtos/appointment-output.dto';
import { UpdateAppointmentInput } from '../../../../appointment-booking/shared/dtos/appointment-input.dto';
import { IAppointmentAPIs } from '../../../../appointment-booking/shared/interfaces/appointment-apis.interface';

@Injectable()
export class AppointmentsGateway {
  constructor(
    @Inject(IAppointmentAPIs)
    private readonly appointmentsAPI: IAppointmentAPIs,
  ) {}

  async getUpcomingAppointments(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ appointments: AppointmentOutput[]; count: number }> {
    return await this.appointmentsAPI.getUpcomingAppointments(
      ctx,
      limit,
      offset,
    );
  }

  async updateAppointment(
    ctx: RequestContext,
    appointmentId: string,
    input: UpdateAppointmentInput,
  ): Promise<AppointmentOutput> {
    return await this.appointmentsAPI.updateAppointment(
      ctx,
      appointmentId,
      input,
    );
  }
}
