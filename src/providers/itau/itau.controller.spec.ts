import { Test, TestingModule } from '@nestjs/testing';
import { ItauController } from './itau.controller';

describe('ItauController', () => {
  let controller: ItauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItauController],
    }).compile();

    controller = module.get<ItauController>(ItauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
