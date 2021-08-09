import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Invoice } from './domain/entities/invoice.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('search')
  search() {
    return [
      {
        name: 'Christiano',
        taxId: '78006325391',
        amount: 100,
        status: 'pending',
      },
    ];
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
}
