import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Scope } from '@sentry/node';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import {
  Invoice,
  InvoiceDTO,
  OrderDTO,
} from './domain/entities/invoice.entity';
import { Produto } from './domain/entities/produto.entity';

@ApiBearerAuth()
@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    // @InjectSentry() private readonly client: SentryService,
    // @InjectRepository(Produto)
    // private produtoRepository: Repository<Produto>,
  ) {}

  // @ApiOperation({ summary: 'Generate invoice by Order' })
  // @ApiResponse({ status: 201, description: 'Invoice type', type: InvoiceDTO })
  // @Post('invoice')
  // async create(@Body() body: OrderDTO): Promise<any> {
  //   const createdBy = 'Rest API';
  //   const payload = { createdBy, lastChangedBy: createdBy, ...body };
  //   console.log('Body', body);
  //   try {
  //     const invoice: Invoice = await this.appService.createInvoice(payload);
  //     return invoice;
  //   } catch (exception) {
  //     const scope = new Scope();
  //     scope.setTag('invoice', 'invoice');
  //     this.client.instance().captureException(exception, () => scope);
  //     return {
  //       name: exception.name,
  //       taxId: '',
  //       amount: 0,
  //     };
  //   }
  // }

  // @Post('assessment')
  // async createAssessment(@Body() body: Produto) {
  //   const createdBy = 'Rest API';
  //   const payload = { createdBy, lastChangedBy: createdBy, ...body };
  //   try {
  //     const produto = await this.produtoRepository.save(payload);
  //     return produto;
  //   } catch (exception) {
  //     const scope = new Scope();
  //     scope.setTag('produto', 'produto');
  //     this.client.instance().captureException(exception, () => scope);
  //     return exception;
  //   }
  // }

  // @Get('search')
  // search() {
  //   return this.appService.listAll();
  // }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
