import { DynamicModule, Global, Module } from '@nestjs/common';
import { STARKBANK_MODULE_CONFIG } from './constants/Startkbank';
import { StarkbankConfig } from './interfaces/StarkbankConfig';
import { StarkbankService } from './Starkbank.service';

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
