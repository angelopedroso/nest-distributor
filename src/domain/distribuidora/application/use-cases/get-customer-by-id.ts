import { Either, left, right } from '@/core/either'
import { CustomerWithAddress } from '../../enterprise/entities/value-objects/customer-with-address'
import { CustomerRepository } from '../repositories/customer-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export interface GetCustomerByIdUseCaseRequest {
  id: string
}

export type GetCustomerByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    customer: CustomerWithAddress
  }
>

export class GetCustomerByIdByIdUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({
    id,
  }: GetCustomerByIdUseCaseRequest): Promise<GetCustomerByIdUseCaseResponse> {
    const customer = await this.customerRepository.findByIdWithAddress(id)

    if (!customer) {
      return left(new ResourceNotFoundError('Cliente'))
    }

    return right({ customer })
  }
}
