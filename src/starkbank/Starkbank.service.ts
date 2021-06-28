import { Inject, Injectable } from '@nestjs/common';
import * as starkbank from 'starkbank';
import { StarkbankConfig } from './interfaces/StarkbankConfig';
import { STARKBANK_MODULE_CONFIG } from './constants/Startkbank';

@Injectable()
export class StarkbankService {
  constructor(
    @Inject(STARKBANK_MODULE_CONFIG)
    private starkbankConfig: StarkbankConfig
  ) {
    starkbank.user = new starkbank.Project(this.starkbankConfig);
  }

  async createInvoice(dto) {
    return starkbank.invoice.create([dto]);
  }
}
