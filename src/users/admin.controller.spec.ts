import { Test, TestingModule } from '@nestjs/testing';
import { AdminControllerTsController } from './admin.controller';

describe('AdminControllerTsController', () => {
  let controller: AdminControllerTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminControllerTsController],
    }).compile();

    controller = module.get<AdminControllerTsController>(
      AdminControllerTsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
