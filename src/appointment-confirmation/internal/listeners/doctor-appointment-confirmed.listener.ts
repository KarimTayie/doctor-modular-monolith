import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { IAppointmentConfirmedEvent } from '../../../appointment-booking/shared/interfaces/appointment-confirmed-event.interface';

@Injectable()
export class DoctorAppointmentConfirmedListener {
  @OnEvent('appointment.confirmed')
  handleDoctorNotification(event: IAppointmentConfirmedEvent): void {
    console.log(
      `
      Doctor Notification:
      - You have a new appointment with ${event.patientName}.
      - Appointment Time: ${event.appointmentTime.toISOString()}s
      `,
    );
  }
}
