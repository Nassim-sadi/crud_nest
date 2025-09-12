import { Test, TestingModule } from '@nestjs/testing';
import { LocationUpdateController } from './location-update.controller';
import { LocationUpdateService } from './location-update.service';

describe('LocationUpdateController', () => {
  let controller: LocationUpdateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationUpdateController],
      providers: [LocationUpdateService],
    }).compile();

    controller = module.get<LocationUpdateController>(LocationUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
