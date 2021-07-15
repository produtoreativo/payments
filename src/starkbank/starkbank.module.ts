import { Module } from '@nestjs/common';
import { StarkbankService } from './starkbank.service';

@Module({
  providers: [StarkbankService],
  exports: [StarkbankService],
})
export class StarkbankModule {}
