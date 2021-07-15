import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './models/entities/Invoice';
import { StarkbankService } from './starkbank/starkbank.service';

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
    this.invoiceRepository.merge(invoice, payload);
    //invoice.merge(payload);
    await this.invoiceRepository.save(invoice);
    const dto = invoice.createDTO();
    const providerPayload = await this.starkbankService.createInvoice(dto);
    invoice.setProvider(providerPayload);
    await this.invoiceRepository.save(invoice);
    return invoice;
  }
}
