import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './domain/entities/invoice.entity';
import { InvoiceRepository } from './domain/repositories/invoice.repository';
import { KafkaService } from './kafka/kafka.service';
import { StarkbankService } from './starkbank/starkbank.service';
//import { UploadService } from './upload/upload.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: InvoiceRepository,
    //private kafkaService: KafkaService,
    private starkbankService: StarkbankService, //private uploadService: UploadService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async listAll() {
    return this.invoiceRepository.find();
  }

  async createInvoice(payload) {
    try {
      const invoice = new Invoice();
      this.invoiceRepository.merge(invoice, payload);
      await this.invoiceRepository.save(invoice);
      const dto = invoice.createDTO();
      const providerPayload = await this.starkbankService.createInvoice(dto);
      /*
      const awsPayload = await this.uploadService.sendJSON(
        invoice.id,
        'starkbank',
        providerPayload,
      );
      invoice.setProvider(providerPayload, awsPayload);
      */
      invoice.setProvider(providerPayload, providerPayload);
      await this.invoiceRepository.save(invoice);

      const message = {
        providers: [
          {
            type: 'Mail',
            to: 'fabriciolopesvital@gmail.com',
          },
        ],
        templateParams: {
          template: 'payment',
          params: {
            displayName: 'FABRICIO LOPES VITAL',
          },
        },
      };
     // await this.kafkaService.sendPayload(message);
      return invoice;
    } catch (error) {
      debugger;
      throw new Error(error);
    }
  }
}
