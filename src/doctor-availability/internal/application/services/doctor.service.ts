import { Injectable } from '@nestjs/common';
import { AppLogger } from '@Shared/logger/logger.service';
import { RequestContext } from '@Shared/request-context/request-context.dto';
import { plainToClass } from 'class-transformer';

import { DoctorOutput } from '../../../shared/dtos/doctor-output.dto';
import { DoctorRepository } from '../../data/repositories/doctor.repository';

@Injectable()
export class DoctorService {
  constructor(
    private repository: DoctorRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(DoctorService.name);
  }

  async getDoctorById(ctx: RequestContext, id: string): Promise<DoctorOutput> {
    this.logger.log(ctx, `${this.getDoctorById.name} was called`);

    this.logger.log(ctx, `calling ${DoctorRepository.name}.getById`);
    const doctor = await this.repository.getById(id);

    return plainToClass(DoctorOutput, doctor, {
      excludeExtraneousValues: true,
    });
  }
}
