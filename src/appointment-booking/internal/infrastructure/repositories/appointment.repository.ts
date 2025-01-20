import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Appointment } from '../db/appointment.entity';

@Injectable()
export class AppointmentRepository extends Repository<Appointment> {
  constructor(private dataSource: DataSource) {
    super(Appointment, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<Appointment> {
    const appointment = await this.findOne({ where: { id } });

    if (!appointment) {
      throw new NotFoundException();
    }

    return appointment;
  }
}
