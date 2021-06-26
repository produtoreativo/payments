import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import * as starkbank from 'starkbank';

@Injectable()
export class StarkbankService {
  constructor() {
    const filePath = process.env.PRIVATE_KEY;
    const file = fs.readFileSync(path.resolve(filePath));
    const privateKey = file.toString();
    starkbank.user = new starkbank.Project({
      environment: 'sandbox',
      id: process.env.STARKBANK_ID,
      privateKey,
    });
  }

  async createInvoice(dto) {
    return starkbank.invoice.create([dto]);
  }
}
