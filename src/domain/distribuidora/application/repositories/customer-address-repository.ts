import { PaginationParams } from '@/core/repositories/pagination-params'
import { CustomerAddress } from '../../enterprise/entities/customer-address'
import { CustomerWithAddress } from '../../enterprise/entities/value-objects/customer-with-address'

export abstract class CustomerAddressRepository {
  abstract create(customerAddress: CustomerAddress): Promise<void>
  abstract delete(customerAddress: CustomerAddress): Promise<void>
  abstract findById(id: string): Promise<CustomerAddress>

  abstract findManyByCustomerId(
    customerId: string,
    params: PaginationParams,
  ): Promise<CustomerAddress[]>

  abstract findManyByCustomerIdWithAddress(
    customerId: string,
    params: PaginationParams,
  ): Promise<CustomerWithAddress[]>
}
