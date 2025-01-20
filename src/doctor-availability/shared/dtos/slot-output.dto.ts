import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SlotOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  time: Date;

  @Expose()
  @ApiProperty()
  isReserved: boolean;

  @Expose()
  @ApiProperty()
  cost: number;
}
