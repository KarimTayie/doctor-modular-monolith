import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { AppointmentStatus } from '../../internal/infrastructure/db/appointment.entity';
import { AppointmentStatusType } from '../interfaces/appointment-status.type';

export class UpdateAppointmentInput {
  @ApiProperty({
    enum: AppointmentStatus,
    default: AppointmentStatus.COMPLETED,
  })
  @IsNotEmpty()
  status: AppointmentStatusType;
}
