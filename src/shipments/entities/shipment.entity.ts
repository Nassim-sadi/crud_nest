// shipments/entities/shipment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { LocationUpdate } from '../../location-update/entities/location-update.entity';
import { ActivityLog } from '../../activity-log/entities/activity-log.entity';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trackingNumber: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'in_transit' | 'delivered';

  @OneToMany(() => LocationUpdate, (loc) => loc.shipment)
  locationUpdates: LocationUpdate[];

  @OneToMany(() => ActivityLog, (log) => log.shipment)
  activityLogs: ActivityLog[];

  @CreateDateColumn()
  createdAt: Date;
}
