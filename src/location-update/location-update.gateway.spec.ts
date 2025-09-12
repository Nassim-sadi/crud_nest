import { Test, TestingModule } from '@nestjs/testing';
import { LocationUpdateGateway } from './location-update.gateway';

describe('LocationUpdateGateway', () => {
  let gateway: LocationUpdateGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationUpdateGateway],
    }).compile();

    gateway = module.get<LocationUpdateGateway>(LocationUpdateGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
