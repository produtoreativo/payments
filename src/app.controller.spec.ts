import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Invoice } from './domain/entities/Invoice';
import { InvoiceRepository } from './domain/repositories/InvoiceRepository';
import { STARKBANK_MODULE_CONFIG } from './starkbank/constants/Startkbank';
import { StarkbankConfig } from './starkbank/interfaces/StarkbankConfig';
import { StarkbankService } from './starkbank/Starkbank.service';
import { StarkbankModule } from './starkbank/startbank.module';

class StarkbankServiceMock extends StarkbankService {
  createInvoice = jest.fn();
}

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  //let starkbankConfig: StarkbankConfig;

  beforeEach(async () => {
    //starkbankConfig = { id: '1', environment: '', privateKey: ''};

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        /*         {
          provide: STARKBANK_MODULE_CONFIG,
          useValue: starkbankConfig,
        }, */
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
      //const result = 'Hello World!';
      //jest.spyOn(appService, 'getHello').mockImplementation(() => result);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
