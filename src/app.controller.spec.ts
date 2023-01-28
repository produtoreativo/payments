import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceDTO } from './domain/entities/invoice.entity';
import { InvoiceRepository } from './domain/repositories/invoice.repository';
import { StarkbankService } from './starkbank/starkbank.service';

class StarkbankServiceMock extends StarkbankService {}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: 'InvoiceRepository',
          useClass: InvoiceRepository,
        },
        {
          provide: 'StarkbankService',
          useFactory: () => StarkbankServiceMock,
        },
        AppService
      ],
    }).compile();
    
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
