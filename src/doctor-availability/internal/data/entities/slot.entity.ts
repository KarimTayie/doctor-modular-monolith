import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Appointment } from '../../../../appointment-booking/internal/infrastructure/db/appointment.entity';
import { Doctor } from './doctor.entity';

@Entity('slots')
export class Slot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  time: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column({ type: 'boolean', default: false })
  isReserved: boolean;

  @OneToOne(() => Appointment, (appointment) => appointment.slot, {
    nullable: true,
  })
  appointment: Appointment;

  // @ManyToOne(() => Doctor, (doctor) => doctor.slots, { onDelete: 'CASCADE' })
  // doctor: Doctor;

  // @Column()
  // doctorId: string;

  // @Column()
  // doctorName: string;
}
