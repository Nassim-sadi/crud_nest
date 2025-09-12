import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Shipment } from 'src/shipments/entities/shipment.entity';

@Entity('activity_log')
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string; // e.g. "Order"

  @Column()
  action: string; // e.g. "created", "updated", "deleted"

  @Column({ type: 'json', nullable: true })
  data: Record<string, any>;

  @Column({ nullable: true })
  platform: string; // OS/device info

  @Column({ nullable: true })
  browser: string; // browser info

  @Column({ nullable: true })
  device: string; // device info

  @ManyToOne(() => User, (user) => user.activityLogs, { nullable: true })
  user: User;

  @ManyToOne(() => Shipment, (shipment) => shipment.activityLogs, {
    nullable: true,
  })
  shipment: Shipment;

  @CreateDateColumn()
  timestamp: Date;
}
