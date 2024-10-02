import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CustomerRepository } from '../repositories/customer-repository'
import { Either, right } from '@/core/either'
import { Customer } from '../../enterprise/entities/customer'

export interface CreateCustomerUseCaseRequest {
  recipientId: UniqueEntityID
  addressId: UniqueEntityID
  name: string
  document: string
  stateRegistration?: string
  phone: string
  email: string
}

export type CreateCustomerUseCaseResponse = Either<null, { customer: Customer }>

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({
    addressId,
    document,
    email,
    name,
    phone,
    recipientId,
    stateRegistration,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customer = Customer.create({
      addressId,
      document,
      email,
      name,
      phone,
      recipientId,
      stateRegistration,
    })

    await this.customerRepository.create(customer)

    return right({ customer })
  }
}
