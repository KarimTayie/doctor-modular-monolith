import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class DoctorRepository extends Repository<Doctor> {
  constructor(private dataSource: DataSource) {
    super(Doctor, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<Doctor> {
    const doctor = await this.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException();
    }

    return doctor;
  }
}
