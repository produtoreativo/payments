import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Scope } from '@sentry/node';
import { AppService } from './app.service';
import { InvoiceDTO, OrderDTO } from './domain/entities/invoice.entity';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectSentry() private readonly client: SentryService,
  ) {}

  @ApiOperation({ summary: 'Generate invoice per Order' })
  @ApiResponse({ status: 201, description: 'Invoice type', type: InvoiceDTO })
  @Post('invoice')
  async create(@Body() body: OrderDTO): Promise<InvoiceDTO> {
    const createdBy = 'Rest API';
    const payload = { createdBy, lastChangedBy: createdBy, ...body };
    try {
      const invoiceDto = await this.appService.createInvoice(payload);
      return invoiceDto;
    } catch (exception) {
      const scope = new Scope();
      scope.setTag('invoice', 'invoice');
      this.client.instance().captureException(exception, () => scope);
      return exception;
    }
  }

  @Get('search')
  search() {
    return this.appService.listAll();
    /*
    return [
      {
        name: 'Christiano',
        taxId: '78006325391',
        amount: 100,
        status: 'pending',
      },
    ];
    */
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
