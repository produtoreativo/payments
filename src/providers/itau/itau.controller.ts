import { Controller, Get } from '@nestjs/common';
import { ItauService } from './itau.service';

@Controller('itau')
export class ItauController {
  constructor(private readonly itauService: ItauService) {}

  @Get()
  getHello(): string {
    return this.itauService.getHello();
  }
}

