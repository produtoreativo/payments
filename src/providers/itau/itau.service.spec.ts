import { Test, TestingModule } from '@nestjs/testing';
import { ItauService } from './itau.service';

describe('ItauService', () => {
  let service: ItauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItauService],
    }).compile();

    service = module.get<ItauService>(ItauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
