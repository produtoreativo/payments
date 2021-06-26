import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as starkbank from 'starkbank';
import { Invoice } from './domain/entities/Invoice';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createInvoice(payload) {
    debugger
    const filePath = process.env.PRIVATE_KEY;
    const file = fs.readFileSync(path.resolve(filePath));
    const privateKey = file.toString();
    starkbank.user = new starkbank.Project({
      environment: 'sandbox',
      id: process.env.STARKBANK_ID,
      privateKey,
    });
    debugger
    const invoice = new Invoice();
    invoice.merge(payload);
    await this.invoiceRepository.save(invoice);
    const dto = invoice.createDTO();
    const providerPayload = await starkbank.invoice.create([dto]);
    invoice.setProvider(providerPayload);
    await this.invoiceRepository.save(invoice);
    return invoice;
  }
}