import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './domain/entities/Invoice';
import { StarkbankService } from './startkbank/Starkbank.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    private starkbankService: StarkbankService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createInvoice(payload) {
    const invoice = new Invoice();
    invoice.merge(payload);
    await this.invoiceRepository.save(invoice);
    const dto = invoice.createDTO();
    const providerPayload = await this.starkbankService.createInvoice(dto);
    invoice.setProvider(providerPayload);
    await this.invoiceRepository.save(invoice);
    return invoice;
  }
}
