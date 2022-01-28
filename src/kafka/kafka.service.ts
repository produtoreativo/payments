import { Inject, Injectable } from '@nestjs/common';
import { Kafka, KafkaConfig, Producer } from 'kafkajs';
import { KAFKA_MODULE_CONFIG } from './kafka.constants';

@Injectable()
export class KafkaService extends Kafka {
  private producerInstante: Producer;

  constructor(
    @Inject(KAFKA_MODULE_CONFIG)
    private kafkaConfig: KafkaConfig,
  ) {
    super(kafkaConfig);
    this.producerInstante = this.producer();

    this.producerInstante.connect();
  }

  async sendPayload(payload) {
    // try {
    const response = await this.producerInstante.send({
      topic: 'no5nmjx4-notification-created',
      messages: [{ value: JSON.stringify(payload) }],
    });

    // } catch(error) {
    //   console.log('error')
    // }
  }
}
