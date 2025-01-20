import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Slot } from './slot.entity';

@Entity('doctors', { synchronize: false })
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @OneToMany(() => Slot, (slot) => slot.doctor, { cascade: true })
  // slots: Slot[];
}
