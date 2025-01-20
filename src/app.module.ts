import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentBookingModule } from './appointment-booking/appointment-booking.module';
import { AppointmentConfirmationModule } from './appointment-confirmation/appointment-confirmation.module';
import { DoctorAppointmentManagementModule } from './doctor-appointment-management/doctor-appointment-management.module';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    DoctorAvailabilityModule,
    AppointmentBookingModule,
    AppointmentConfirmationModule,
    DoctorAppointmentManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
