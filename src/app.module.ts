import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as ormconfig from '../ormconfig';
import { Invoice } from './domain/entities/Invoice';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
