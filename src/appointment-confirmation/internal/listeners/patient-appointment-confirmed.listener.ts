import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { IAppointmentConfirmedEvent } from '../../../appointment-booking/shared/interfaces/appointment-confirmed-event.interface';

@Injectable()
export class PatientAppointmentConfirmedListener {
  @OnEvent('appointment.confirmed')
  handlePatientNotification(event: IAppointmentConfirmedEvent): void {
    console.log(
      `
      Patient Notification:
      - Hello ${event.patientName},
      - Your appointment with Dr. X is confirmed.
      - Appointment Time: ${event.appointmentTime.toISOString()}
      `,
    );
  }
}
