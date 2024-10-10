import { Either, left, right } from '@/core/either'
import { Customer } from '../../enterprise/entities/customer'
import { CustomerRepository } from '../repositories/customer-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

export interface EditCustomerUseCaseRequest {
  customerId: string
  recipientId: string
  name: string
  document: string
  stateRegistration?: string
  phone: string
  email: string
}

export type EditCustomerUseCaseResponse = Either<
  ResourceNotFoundError,
  { customer: Customer }
>

export class EditCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({
    customerId,
    recipientId,
    document,
    email,
    name,
    phone,
    stateRegistration,
  }: EditCustomerUseCaseRequest): Promise<EditCustomerUseCaseResponse> {
    const customer = await this.customerRepository.findById(customerId)

    if (!customer) {
      return left(new ResourceNotFoundError('Cliente'))
    }

    if (recipientId !== customer.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    customer.document = document
    customer.email = email
    customer.name = name
    customer.phone = phone
    customer.stateRegistration = stateRegistration

    await this.customerRepository.save(customer)

    return right({ customer })
  }
}
