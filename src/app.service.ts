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
      // 1 teste
      const invoice = new Invoice();
      this.invoiceRepository.merge(invoice, payload);
      // 2 teste
      await this.invoiceRepository.save(invoice);
      // 3 teste
      const dto = invoice.createDTO();
      //.invoice.create([dto]);
      // 4 teste
      const providerPayload = await this.starkbankService['invoice'].create([
        dto,
      ]);
      // 5 teste
      invoice.setProvider(providerPayload);
      return await this.invoiceRepository.save(invoice);
  }
}
