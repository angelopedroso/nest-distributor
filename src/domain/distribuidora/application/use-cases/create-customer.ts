import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CustomerRepository } from '../repositories/customer-repository'
import { Either, left, right } from '@/core/either'
import { Customer } from '../../enterprise/entities/customer'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'

export interface CreateCustomerUseCaseRequest {
  recipientId: UniqueEntityID
  addressId: UniqueEntityID
  name: string
  document: string
  stateRegistration?: string
  phone: string
  email: string
}

export type CreateCustomerUseCaseResponse = Either<
  RecipientAlreadyExistsError,
  { customer: Customer }
>

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
    const customerWithSameDocument =
      await this.customerRepository.findByDocument(document)

    if (customerWithSameDocument) {
      return left(new RecipientAlreadyExistsError(document))
    }

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
