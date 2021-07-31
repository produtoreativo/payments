import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceRepository } from './domain/repositories/InvoiceRepository';
import { StarkbankService } from './starkbank/starkbank.service';

class StarkbankServiceMock extends StarkbankService {
  createInvoice = jest.fn();
}

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: 'InvoiceRepository',
          useClass: InvoiceRepository,
        },
        {
          provide: 'StarkbankService',
          useFactory: () => StarkbankServiceMock,
        },
        AppService,
      ],
    }).compile();
    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
