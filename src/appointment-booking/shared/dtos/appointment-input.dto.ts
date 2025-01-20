import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { AppointmentStatusType } from '../interfaces/appointment-status.type';

export class UpdateAppointmentInput {
  @ApiProperty()
  @IsNotEmpty()
  status: AppointmentStatusType;
}
