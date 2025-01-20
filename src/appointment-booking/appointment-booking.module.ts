import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DoctorAvailabilityModule } from '../doctor-availability/doctor-availability.module';
import { SharedModule } from '../shared/shared.module';
import { BookAppointmentController } from './internal/api/controllers/book-appointment.controller';
import { ListAvailableSlotsController } from './internal/api/controllers/list-available-slots.controller';
import { BookAppointmentHandler } from './internal/infrastructure/command-handlers/book-appointment.handler';
import { SlotsGateway } from './internal/infrastructure/gateways/slots-gateway';
import { GetAvailableSlotsHandler } from './internal/infrastructure/query-handlers/get-available-slots.handler';
import { AppointmentRepository } from './internal/infrastructure/repositories/appointment.repository';
import { AppointmentAPIs } from './shared/facades/appointment-apis';
import { IAppointmentAPIs } from './shared/interfaces/appointment-apis.interface';

@Module({
  imports: [SharedModule, CqrsModule, DoctorAvailabilityModule],
  providers: [
    BookAppointmentHandler,
    GetAvailableSlotsHandler,
    AppointmentRepository,
    SlotsGateway,
    {
      provide: IAppointmentAPIs,
      useClass: AppointmentAPIs,
    },
  ],
  controllers: [BookAppointmentController, ListAvailableSlotsController],
  exports: [IAppointmentAPIs],
})
export class AppointmentBookingModule {}
