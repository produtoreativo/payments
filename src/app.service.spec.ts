import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from "./app.service";
import { InvoiceRepository } from "./domain/repositories/invoice.repository";
import { StarkbankService } from './starkbank/starkbank.service';
import { Invoice, InvoiceDTO } from './domain/entities/invoice.entity';
import { STARKBANK_MODULE_CONFIG } from './starkbank/constants/starkbank';

class InvoiceRepositoryMock extends InvoiceRepository {
    merge = jest.fn()
    save = jest.fn(invoice => invoice)
}

const providerPayload = [{
    id: 101,
    status: 'ok',
}]

class StarkbankServiceMock extends StarkbankService {
    constructor(starkbankConfig) {
        super(starkbankConfig);
        this['invoice'] = {
            create: jest.fn().mockReturnValue(providerPayload)
        }
    }
}

describe(`
  #AppService
`, () => {

    describe('#createInvoice()', () => {

        let appService;

        beforeEach(async () => {
            const app: TestingModule = await Test.createTestingModule({
                providers: [
                  {
                    provide: 'InvoiceRepository',
                    useClass: InvoiceRepositoryMock,
                  },
                  {
                    provide: STARKBANK_MODULE_CONFIG,
                    useValue: {
                      environment: 'sandbox',
                      id: 'ID',
                      privateKey:
                        '-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEIK3RHaLm3Sduc3HKIxu2f7Irqo/VLt/9HUNbctDYLI8qoAcGBSuBBAAK\noUQDQgAEXCawtvpDfDfMyZZjGaQBsu6DNUmUt/zxKGZ315ZWJyoDnWmJUl/QL2/+\n2q6Mr/lPTP+sI13cFOE50el4TUp/Fw==\n-----END EC PRIVATE KEY-----'.replace(
                          /\\n/g,
                          '\n',
                        ),
                    },
                  },
                  { provide: StarkbankService, useClass: StarkbankServiceMock },
                  AppService,
                ],
              }).compile();
          
              appService = app.get<AppService>(AppService);
        })

        it(`
        Dado um payload que respeita o contrato da API
        Quando Starkbank devolver o resultado
        Então o Repository atualiza o Invoice em banco e devolve na chamada
        `, async () => {

            const dto = {
                amount: 1,
                taxId: '',
                name: '',
                orderId: 1,
              } as Invoice;
              const result = await appService.createInvoice(dto);
              expect(result).toHaveProperty('providerId', 101);
        })

    })

})