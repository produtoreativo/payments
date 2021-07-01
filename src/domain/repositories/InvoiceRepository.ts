import { EntityRepository, Repository } from 'typeorm';
import { Invoice } from '../entities/Invoice';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {}
