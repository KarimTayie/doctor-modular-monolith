import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DoctorOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;
}
