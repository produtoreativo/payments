import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'invoices' })
export class Invoice extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  taxId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  providerId: string;

  @Column({ type: 'json', nullable: true })
  providerPayload: JSON;

  @Column({ default: false })
  status: string;

  @Column()
  orderId: number;

  createDTO = () => {
    return {
      amount: this.amount,
      taxId: this.taxId,
      name: this.name,
    };
  };

  setProvider = (providerPayload) => {
    const item = providerPayload[0];
    this.providerId = item.id;
    this.status = item.status;
    this.providerPayload = item;
  };
}
