import { forwardRef, Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { LocationUpdateModule } from 'src/location-update/location-update.module';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { ShipmentGateway } from './shipments.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';

@Module({
  imports: [
    ActivityLogModule,
    forwardRef(() => LocationUpdateModule),
    TypeOrmModule.forFeature([Shipment]),
  ],
  controllers: [ShipmentsController],
  providers: [ShipmentsService, ShipmentGateway],
  exports: [ShipmentsService],
})
export class ShipmentsModule {}
