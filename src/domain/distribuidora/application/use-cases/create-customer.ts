import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CustomerRepository } from '../repositories/customer-repository'
import { Either, left, right } from '@/core/either'
import { Customer } from '../../enterprise/entities/customer'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'
import { DocumentIsNotValid } from './errors/document-not-valid'

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
  RecipientAlreadyExistsError | DocumentIsNotValid,
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

    try {
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
    } catch (error) {
      if (error instanceof DocumentIsNotValid) {
        return left(error)
      }

      return left(new Error(`Ocorreu um erro desconhecido: ${error}`))
    }
  }
}
