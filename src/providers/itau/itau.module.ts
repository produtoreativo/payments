import { Module } from '@nestjs/common';
import { ItauController } from './itau.controller';
import { ItauService } from './itau.service';

@Module({
  controllers: [ItauController],
  providers: [ItauService]
})
export class ItauModule {}
