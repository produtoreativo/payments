import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
@Injectable()
class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

describe(`
AppController
Como uma consultora da Natura
Eu quero cadastrar uma indicação de cliente
Para enviar descontos com meu código
`, () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
