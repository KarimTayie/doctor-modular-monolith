import { RequestContext } from '@Shared/request-context/request-context.dto';

import { AppointmentOutput } from '../../internal/api/dtos/appointment-output.dto';
import { UpdateAppointmentInput } from '../dtos/appointment-input.dto';

export interface IAppointmentAPIs {
  getUpcomingAppointments(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ appointments: AppointmentOutput[]; count: number }>;

  updateAppointment(
    ctx: RequestContext,
    appointmentId: string,
    input: UpdateAppointmentInput,
  ): Promise<AppointmentOutput>;
}

export const IAppointmentAPIs = Symbol('IAppointmentAPIs');
