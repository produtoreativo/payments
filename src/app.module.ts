import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from 'nestjs-s3';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormconfig from '../ormconfig';
import { Invoice } from './domain/entities/Invoice';
import { StarkbankModule } from './starkbank/startbank.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Invoice]),
    StarkbankModule.register({
      environment: process.env.STARKBANK_ENV,
      id: process.env.STARKBANK_ID,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    S3Module.forRoot({
      config: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
