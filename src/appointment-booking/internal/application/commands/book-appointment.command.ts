import { RequestContext } from '@Shared/request-context/request-context.dto';

export class BookAppointmentCommand {
  constructor(
    public readonly ctx: RequestContext,
    public readonly slotId: string,
    public readonly patientId: string,
    public readonly patientName: string,
  ) {}
}
