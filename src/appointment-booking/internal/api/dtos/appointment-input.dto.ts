import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BookAppointmentInput {
  @ApiProperty()
  @IsNotEmpty()
  slotId: string;

  @ApiProperty()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty()
  @IsNotEmpty()
  patientName: string;
}
