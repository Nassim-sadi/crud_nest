// locations/entities/location-update.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Shipment } from '../../shipments/entities/shipment.entity';

@Entity('location_updates')
export class LocationUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shipment, (shipment) => shipment.locationUpdates, {
    onDelete: 'CASCADE',
  })
  shipment: Shipment;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @CreateDateColumn()
  timestamp: Date;
}
