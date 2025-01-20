import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsNotEmpty, IsOptional } from 'class-validator';

export class AddSlotDto {
  @ApiProperty()
  @IsNotEmpty()
  time: Date;

  @ApiProperty({
    format: 'decimal',
  })
  @IsDecimal()
  cost: number;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  isReserved?: boolean = false;
}
