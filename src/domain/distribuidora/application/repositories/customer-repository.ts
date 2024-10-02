import { PaginationParams } from '@/core/repositories/pagination-params'
import { Customer } from '../../enterprise/entities/customer'
import { CustomerWithAddress } from '../../enterprise/entities/value-objects/customer-with-address'

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>
  abstract save(customer: Customer): Promise<void>
  abstract delete(customer: Customer): Promise<void>

  abstract findById(id: string): Promise<Customer | null>
  abstract findManyByRecipientIdWithAddress(
    recipientId: string,
    params: PaginationParams,
  ): Promise<CustomerWithAddress[]>

  abstract findByIdWithAddress(id: string): Promise<CustomerWithAddress | null>
}
