import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared/shared.module';
import { AddSlotsController } from './internal/api/controllers/add-slot.controller';
import { ListSlotsController } from './internal/api/controllers/list-slots.controller';
import { DoctorService } from './internal/application/services/doctor.service';
import { SlotService } from './internal/application/services/slot.service';
import { Doctor } from './internal/data/entities/doctor.entity';
import { Slot } from './internal/data/entities/slot.entity';
import { DoctorRepository } from './internal/data/repositories/doctor.repository';
import { SlotRepository } from './internal/data/repositories/slot.repository';
import { SlotAPIs } from './shared/facades/slot-apis';
import { ISlotAPIs } from './shared/interfaces/slot-apis.interface';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Doctor, Slot])],
  providers: [
    DoctorRepository,
    SlotRepository,
    DoctorService,
    SlotService,
    {
      provide: ISlotAPIs,
      useClass: SlotAPIs,
    },
  ],
  controllers: [AddSlotsController, ListSlotsController],
  exports: [ISlotAPIs],
})
export class DoctorAvailabilityModule {}
