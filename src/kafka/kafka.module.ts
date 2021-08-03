import { DynamicModule, Global, Module } from '@nestjs/common';
import { KafkaConfig } from 'kafkajs';
import { KAFKA_MODULE_CONFIG } from './kafka.constants';
import { KafkaService } from './kafka.service';

@Global()
@Module({})
export class KafkaModule {
  static forRoot(kafkaConfig: KafkaConfig): DynamicModule {
    return {
      module: KafkaModule,
      providers: [
        {
          provide: KAFKA_MODULE_CONFIG,
          useValue: kafkaConfig,
        },
        KafkaService,
      ],
      exports: [KafkaService],
    };
  }
}
