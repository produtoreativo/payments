import { Module } from '@nestjs/common';
import { StarkbankService } from './Starkbank.service';

@Module({
  providers: [StarkbankService],
  exports: [StarkbankService],
})
export class StarkbankModule {}
