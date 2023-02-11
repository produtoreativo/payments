import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Invoice, OrderDTO } from './domain/entities/invoice.entity';
import { InvoiceRepository } from './domain/repositories/invoice.repository';
import { StarkbankModule } from './starkbank/starkbank.module';
import { StarkbankService } from './starkbank/starkbank.service';

const invoice = new Invoice();
invoice.id = 101;

class AppServiceMock extends AppService {
  createInvoice = jest.fn().mockReturnValue(invoice);
}

class AppServiceErrorMock extends AppService {
  createInvoice = jest.fn().mockReturnValue(() => {
    throw new Error('Out of contract');
  });
}


describe(`
  #AppController
    Para um fornecer meio de pagamento durante uma compra
    Como um cliente de integração
    Eu quero gerar Invoice
`, () => {
  let appController: AppController;

  describe('Success Way', () => {

    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [
          {
            provide: 'InvoiceRepository',
            useClass: InvoiceRepository,
          },
          { provide: StarkbankService, useValue: {} },
          { provide: AppService, useClass: AppServiceMock },
        ],
      }).compile();
  
      appController = app.get<AppController>(AppController);
    });

    describe('#getHello()', () => {

      it('should return "Hello World!"', () => {
        expect(appController.getHello()).toBe('Hello World!');
      });

    })

    describe('#create()', () => {

      it(`
        Dado um DTO do contrato dessa API
        Quando uma solicitação for demandada
        Então um Invoice é retornado
      `, async () => {
        const dto = {
          amount: 1,
          taxId: '',
          name: '',
          orderId: 1,
        } as OrderDTO;
        const result = await appController.create(dto);
        expect(result).toHaveProperty('id', 101);
      });

    })

  })

  describe('Failure Way', () => {
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [
          {
            provide: 'InvoiceRepository',
            useClass: InvoiceRepository,
          },
          { provide: StarkbankService, useValue: {} },
          { provide: AppService, useClass: AppServiceErrorMock },
        ],
      }).compile();
  
      appController = app.get<AppController>(AppController);
    });

    describe('#create()', () => {

      it(`
      Dado um DTO que não segue o contrato dessa API
      Quando uma solicitação for demandada
      Então um erro é devolvido
    `, async () => {
        const dto = {
          amount: 1,
          taxId: '',
          name: '',
          orderId: 1,
        } as OrderDTO;
        const result = await appController.create(dto);
        expect(result).toThrow('Out of contract')
      });

    })

  })

  
});
