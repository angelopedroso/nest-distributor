import { PaginationParams } from '@/core/repositories/pagination-params'
import { Customer } from '../../enterprise/entities/customer'

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>
  abstract save(customer: Customer): Promise<void>

  abstract findManyByRecipientIdWithAddress(
    recipientId: string,
    params: PaginationParams,
  ): Promise<Customer[]>

  abstract findByIdWithAddress(id: string): Promise<Customer>
}
