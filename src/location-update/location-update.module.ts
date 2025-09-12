import { forwardRef, Module } from '@nestjs/common';
import { LocationUpdateService } from './location-update.service';
import { LocationUpdateController } from './location-update.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationUpdate } from './entities/location-update.entity';
import { ShipmentsModule } from 'src/shipments/shipments.module';
import { LocationUpdateGateway } from './location-update.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationUpdate]),
    forwardRef(() => ShipmentsModule),
  ],
  controllers: [LocationUpdateController],
  providers: [LocationUpdateService, LocationUpdateGateway],
  exports: [LocationUpdateService],
})
export class LocationUpdateModule {}
