import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'produtos' })
export class Produto extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'json', nullable: true })
  assessment: JSON;
}
