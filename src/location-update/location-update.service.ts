import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationUpdate } from './entities/location-update.entity';
import { ShipmentsService } from 'src/shipments/shipments.service';
import { Repository } from 'typeorm';

@Injectable()
export class LocationUpdateService {
  constructor(
    @InjectRepository(LocationUpdate)
    private readonly locationUpdateRepository: Repository<LocationUpdate>,
    private readonly shipmentsService: ShipmentsService,
  ) {}
  async updateLocation(
    shipmentId: number,
    coords: { lat: number; lng: number },
  ) {
    // 1. Find the shipment
    // 2. Create a new LocationUpdate tied to it
    // 3. Save in DB
    // 4. (Optional) Emit over WebSocket to update the map in realtime
  }
}
