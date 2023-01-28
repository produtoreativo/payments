import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice, InvoiceDTO } from './domain/entities/invoice.entity';
import { InvoiceRepository } from './domain/repositories/invoice.repository';
import { StarkbankService } from './starkbank/starkbank.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: InvoiceRepository,
    private starkbankService: StarkbankService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async listAll() {
    return this.invoiceRepository.find();
  }

  async createInvoice(payload): Promise<Invoice> {
    try {
      const invoice = new Invoice();
      this.invoiceRepository.merge(invoice, payload);
      await this.invoiceRepository.save(invoice);
      const dto = invoice.createDTO();
      //.invoice.create([dto]);
      const providerPayload = await this.starkbankService['invoice'].create([
        dto,
      ]);
      invoice.setProvider(providerPayload);
      await this.invoiceRepository.save(invoice);
      return invoice;
    } catch (error) {
      debugger;
      console.log('******');
      console.log(error);
      throw new Error(error);
    }
  }
}
