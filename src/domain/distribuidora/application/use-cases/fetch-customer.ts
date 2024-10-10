import { Either, right } from '@/core/either'
import { CustomerWithAddress } from '../../enterprise/entities/value-objects/customer-with-address'
import { CustomerRepository } from '../repositories/customer-repository'

export interface FetchCustomerUseCaseRequest {
  recipientId: string
  page: number
}

export type FetchCustomerUseCaseResponse = Either<
  null,
  { customers: CustomerWithAddress[] }
>

export class FetchCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({
    recipientId,
    page,
  }: FetchCustomerUseCaseRequest): Promise<FetchCustomerUseCaseResponse> {
    const customers =
      await this.customerRepository.findManyByRecipientIdWithAddress(
        recipientId,
        {
          page,
        },
      )

    return right({ customers })
  }
}
