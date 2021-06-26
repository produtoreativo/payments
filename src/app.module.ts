import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as ormconfig from '../ormconfig';
import { Invoice } from './domain/entities/Invoice';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Invoice]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
