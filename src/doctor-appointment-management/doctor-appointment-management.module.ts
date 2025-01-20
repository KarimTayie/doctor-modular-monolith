import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentBookingModule } from '../appointment-booking/appointment-booking.module';
import { Appointment } from '../appointment-booking/internal/infrastructure/db/appointment.entity';
import { SharedModule } from '../shared/shared.module';
import { UpdateAppointmentHandler } from './internal/core/commands/update-appointment.handler';
import { ListUpcomingAppointmentsHandler } from './internal/core/queries/list-upcoming-appointments.handler';
import { ListUpcomingAppointmentsController } from './internal/shell/api/controllers/list-upcoming-appointments.controller';
import { UpdateAppointmentController } from './internal/shell/api/controllers/update-appointment.controller';
import { AppointmentsGateway } from './internal/shell/gateways/appointments-gateway';

@Module({
  imports: [SharedModule, CqrsModule, AppointmentBookingModule],
  providers: [
    UpdateAppointmentHandler,
    ListUpcomingAppointmentsHandler,
    AppointmentsGateway,
  ],
  controllers: [
    ListUpcomingAppointmentsController,
    UpdateAppointmentController,
  ],
  exports: [],
})
export class DoctorAppointmentManagementModule {}
