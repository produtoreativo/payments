import { Inject, Injectable } from '@nestjs/common';
import { Kafka, KafkaConfig } from 'kafkajs';
import { KAFKA_MODULE_CONFIG } from './kafka.constants';

@Injectable()
export class KafkaService extends Kafka {
  constructor(
    @Inject(KAFKA_MODULE_CONFIG)
    private kafkaConfig: KafkaConfig,
  ) {
    super(kafkaConfig);
  }
}
