import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { DoctorAppointmentConfirmedListener } from './internal/listeners/doctor-appointment-confirmed.listener';
import { PatientAppointmentConfirmedListener } from './internal/listeners/patient-appointment-confirmed.listener';

@Module({
  imports: [SharedModule],
  providers: [
    DoctorAppointmentConfirmedListener,
    PatientAppointmentConfirmedListener,
  ],
})
export class AppointmentConfirmationModule {}
