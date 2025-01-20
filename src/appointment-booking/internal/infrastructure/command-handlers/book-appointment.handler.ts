import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppLogger } from '@Shared/logger/logger.service';
import { plainToClass } from 'class-transformer';

import { AppointmentOutput } from '../../api/dtos/appointment-output.dto';
import { BookAppointmentCommand } from '../../application/commands/book-appointment.command';
import { AppointmentConfirmedEvent } from '../../events/appointment-confirmed.event';
import { Appointment } from '../db/appointment.entity';
import { SlotsGateway } from '../gateways/slots-gateway';
import { AppointmentRepository } from '../repositories/appointment.repository';

@CommandHandler(BookAppointmentCommand)
export class BookAppointmentHandler
  implements ICommandHandler<BookAppointmentCommand>
{
  constructor(
    private readonly appointmentRepo: AppointmentRepository,
    private readonly slotsGateway: SlotsGateway,
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: AppLogger,
  ) {}

  async execute({
    ctx,
    slotId,
    patientId,
    patientName,
  }: BookAppointmentCommand): Promise<any> {
    this.logger.log(ctx, `${this.execute.name} was called`);

    const isSlotFree = await this.slotsGateway.isSlotFree(ctx, slotId);

    if (!isSlotFree) {
      throw new BadRequestException();
    }

    const reservedSlot = await this.slotsGateway.reserveSlot(ctx, slotId);

    const input = { slotId, patientId, patientName };
    const appointment = plainToClass(Appointment, input);

    const savedAppointment = await this.appointmentRepo.save(appointment);

    // Emit event
    this.eventEmitter.emit(
      'appointment.confirmed',
      new AppointmentConfirmedEvent(
        savedAppointment.id,
        savedAppointment.patientName,
        reservedSlot.time,
      ),
    );

    return plainToClass(AppointmentOutput, savedAppointment, {
      excludeExtraneousValues: true,
    });
  }
}
