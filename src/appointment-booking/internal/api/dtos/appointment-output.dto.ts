import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AppointmentOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  slotId: string;

  @Expose()
  @ApiProperty()
  patientId: string;

  @Expose()
  @ApiProperty()
  patientName: string;

  @Expose()
  @ApiProperty()
  status: string;

  @Expose()
  @ApiProperty()
  reservedAt: Date;
}
