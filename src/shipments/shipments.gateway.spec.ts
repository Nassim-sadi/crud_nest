import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentsGateway } from './shipments.gateway';

describe('ShipmentsGateway', () => {
  let gateway: ShipmentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentsGateway],
    }).compile();

    gateway = module.get<ShipmentsGateway>(ShipmentsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
