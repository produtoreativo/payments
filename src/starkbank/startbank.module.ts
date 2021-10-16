import { DynamicModule, Global, Module } from '@nestjs/common';
import { STARKBANK_MODULE_CONFIG } from './constants/startkbank';
import { StarkbankConfig } from './interfaces/starkbank.config';
import { StarkbankService } from './starkbank.service';

@Global()
@Module({})
export class StarkbankModule {
  static register(starkbankConfig: StarkbankConfig): DynamicModule {
    return {
      module: StarkbankModule,
      providers: [
        {
          provide: STARKBANK_MODULE_CONFIG,
          useValue: starkbankConfig,
        },
        StarkbankService,
      ],
      exports: [StarkbankService],
    };
  }
}
