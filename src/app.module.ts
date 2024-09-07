import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';
import { ItauModule } from './providers/itau/itau.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SentryModule.forRoot({
      debug: true,
      dsn: process.env.SENTRY_DSN,
      logLevel: LogLevel.Debug,
      environment: 'development',
      tracesSampleRate: 1.0,
    }),
    ItauModule,
    
  ],
})
export class AppModule {}
