import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as ormconfig from '../ormconfig';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
