import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Invoice } from './domain/entities/invoice.entity';
import { Producer } from './kafka/decorators/producer';
import { KafkaService } from './kafka/kafka.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    public kafkaService: KafkaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('invoice')
  async create(@Request() req: Request): Promise<Invoice> {
    const createdBy = 'Rest API';
    const payload = {
      createdBy,
      lastChangedBy: createdBy,
      ...req.body,
    };
    return this.appService.createInvoice(payload);
  }

  @Get('webhook')
  //@Producer({ topic: 'payments'})
  async webhook() {
    debugger;
    return {};
  }
}
