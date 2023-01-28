import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Invoice, OrderDTO } from './domain/entities/invoice.entity';
import { InvoiceRepository } from './domain/repositories/invoice.repository';
import { STARKBANK_MODULE_CONFIG } from './starkbank/constants/starkbank';
import { StarkbankModule } from './starkbank/starkbank.module';
import { StarkbankService } from './starkbank/starkbank.service';

const invoice = new Invoice();
invoice.id = 101;

class AppServiceMock extends AppService {
  createInvoice = jest.fn().mockReturnValue(invoice);
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: 'InvoiceRepository',
          useClass: InvoiceRepository,
        },
        // {
        //   provide: STARKBANK_MODULE_CONFIG,
        //   useValue: {
        //     environment: 'sandbox',
        //     id: 'ID',
        //     privateKey:
        //       'PRIVATE_KEY'.replace(
        //         /\\n/g,
        //         '\n',
        //       ),
        //   },
        // },
        // StarkbankService,
        { provide: StarkbankService, useValue: {} },

        { provide: AppService, useClass: AppServiceMock },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
    it('should return success when"', async () => {
      const dto = {
        amount: 1,
        taxId: '',
        name: '',
        orderId: 1,
      } as OrderDTO;
      const result = await appController.create(dto);
      expect(result).toHaveProperty('id', 101);
    });
  });
});
