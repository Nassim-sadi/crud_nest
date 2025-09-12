import { Test, TestingModule } from '@nestjs/testing';
import { LocationUpdateService } from './location-update.service';

describe('LocationUpdateService', () => {
  let service: LocationUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationUpdateService],
    }).compile();

    service = module.get<LocationUpdateService>(LocationUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
