import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormconfig from '../ormconfig';
import { Invoice } from './domain/entities/invoice.entity';
import { SentryModule } from '@ntegral/nestjs-sentry';
// import { LogLevel } from '@sentry/types';
import { Produto } from './domain/entities/produto.entity';
import { StarkbankModule } from './starkbank/starkbank.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SentryModule.forRoot({
      debug: true,
      dsn: process.env.SENTRY_DSN,
      logLevels: ['debug'],
      environment: 'dev',
      // tracesSampleRate: 1.0,
    }),
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Invoice, Produto]),
    StarkbankModule.register({
      environment: process.env.STARKBANK_ENV,
      id: process.env.STARKBANK_ID,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
