import { Inject, Injectable } from '@nestjs/common';
import { InvoiceDTO } from 'src/domain/entities/invoice.entity';
import * as starkbank from 'starkbank';
import { STARKBANK_MODULE_CONFIG } from './constants/starkbank';
import { StarkbankConfig } from './interfaces/starkbank.config';
@Injectable()
export class StarkbankService {
  constructor(
    @Inject(STARKBANK_MODULE_CONFIG)
    private starkbankConfig: StarkbankConfig,
  ) {
    // const project = new starkbank.Project(this.starkbankConfig);
    starkbank.user = new starkbank.Project(this.starkbankConfig);
    Object.assign(this, starkbank);
  }

  // async generateInvoice(dto: InvoiceDTO) {
  //   try {
  //     return starkbank.invoice.create([dto]);
  //   } catch (error) {
  //     console.log(error);
  //     return {};
  //   }

  // }
}
