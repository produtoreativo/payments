import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Invoice, OrderDTO } from './domain/entities/invoice.entity';
import { Produto } from './domain/entities/produto.entity';
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

class MockedRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  save = jest.fn().mockImplementation((payload) => payload);
}

class MockedErrorRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  save = jest.fn().mockReturnValue(() => {
    throw new Error('Error to save product');
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
          {
            provide: getRepositoryToken(Produto),
            useClass: MockedRepository,
          },
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
    
    describe('#createAssessment()', () => {
      it(`
        Dado uma entitade de Produto
        Quando uma solicitação for demandada
        Então deve-se retornar um produto
      `, async () => {
        const produto = new Produto();
  
        const result = await appController.createAssessment(produto);
  
        expect(result).toHaveProperty('createdBy', 'Rest API');
        expect(result).toHaveProperty('lastChangedBy', 'Rest API');
      })
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
          {
            provide: getRepositoryToken(Produto),
            useClass: MockedErrorRepository,
          },
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


    describe('#createAssessment()', () => {

      it(`
        Dado uma entitade de Produto
        Quando uma solicitação for demandada
        Então deve-se enviar a exceção para o Sentry e retornar exceção
      `, async () => {
        const produto = new Produto();
        const result = await appController.createAssessment(produto);

        expect(result).toThrow('Error to save product');
      })
    })

  })
});
