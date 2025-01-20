import { Injectable } from '@nestjs/common';
import { AppLogger } from '@Shared/logger/logger.service';
import { RequestContext } from '@Shared/request-context/request-context.dto';
import { plainToClass } from 'class-transformer';
import { MoreThanOrEqual } from 'typeorm';

import {
  Appointment,
  AppointmentStatus,
} from '../../internal/infrastructure/db/appointment.entity';
import { AppointmentRepository } from '../../internal/infrastructure/repositories/appointment.repository';
import { UpdateAppointmentInput } from '../dtos/appointment-input.dto';
import { AppointmentOutput } from '../dtos/appointment-output.dto';
import { IAppointmentAPIs } from '../interfaces/appointment-apis.interface';

@Injectable()
export class AppointmentAPIs implements IAppointmentAPIs {
  constructor(
    private repository: AppointmentRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AppointmentAPIs.name);
  }

  async getUpcomingAppointments(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ appointments: AppointmentOutput[]; count: number }> {
    const currentDate = new Date();

    const [appointments, count] = await this.repository.findAndCount({
      where: {
        slot: { isReserved: true, time: MoreThanOrEqual(currentDate) },
      },
      order: { slot: { time: 'ASC' } },
      take: limit,
      skip: offset,
      relations: ['slot'],
    });

    const appointmentsOutput = plainToClass(AppointmentOutput, appointments, {
      excludeExtraneousValues: true,
    });

    return { appointments: appointmentsOutput, count };
  }

  async updateAppointment(
    ctx: RequestContext,
    appointmentId: string,
    input: UpdateAppointmentInput,
  ): Promise<AppointmentOutput> {
    this.logger.log(ctx, `${this.updateAppointment.name} was called`);
    const appointment = await this.repository.getById(appointmentId);

    const updatedAppointment: Appointment = {
      ...appointment,
      status: AppointmentStatus[input.status],
    };

    this.logger.log(ctx, `calling ${AppointmentRepository.name}.save`);
    const savedAppointment = await this.repository.save(updatedAppointment);

    return plainToClass(AppointmentOutput, savedAppointment, {
      excludeExtraneousValues: true,
    });
  }
}
