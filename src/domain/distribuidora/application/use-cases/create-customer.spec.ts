import { InMemoryCustomerRepository } from 'test/repositories/in-memory-customer-repository'
import { CreateCustomerUseCase } from './create-customer'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { MakeCustomer } from 'test/factories/make-customer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'
import { CustomerProps } from '../../enterprise/entities/customer'
import { DocumentIsNotValid } from './errors/document-not-valid'

let inMemoryCustomerRepository: InMemoryCustomerRepository
let inMemoryAddressRepository: InMemoryAddressRepository

let sut: CreateCustomerUseCase

describe('Create Customer', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryCustomerRepository = new InMemoryCustomerRepository(
      inMemoryAddressRepository,
    )

    sut = new CreateCustomerUseCase(inMemoryCustomerRepository)
  })

  it('should be able to create a new customer', async () => {
    const customer = MakeCustomer({
      recipientId: new UniqueEntityID('1'),
      addressId: new UniqueEntityID('1'),
    })

    const newCustomer = await sut.execute(customer)

    expect(newCustomer.isRight()).toBeTruthy()
    expect(newCustomer.value).toEqual({
      customer: expect.objectContaining({
        recipientId: new UniqueEntityID('1'),
        addressId: new UniqueEntityID('1'),
      }),
    })
  })

  it('should not be able to create a new customer, due duplicated customer', async () => {
    const customer = MakeCustomer({
      recipientId: new UniqueEntityID('1'),
      addressId: new UniqueEntityID('1'),
    })

    inMemoryCustomerRepository.items.push(customer)

    const newCustomer = await sut.execute(customer)

    expect(newCustomer.isLeft()).toBeTruthy()
    expect(newCustomer.value).toBeInstanceOf(RecipientAlreadyExistsError)
  })

  it('should not be able to create a new customer, due wrong document', async () => {
    const customer = MakeCustomer()

    const wrongCustomer: CustomerProps = {
      addressId: customer.addressId,
      createdAt: customer.createdAt,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      recipientId: customer.recipientId,
      type: customer.type,
      stateRegistration: customer.stateRegistration,
      document: '12345678000190',
    }

    const newCustomer = await sut.execute(wrongCustomer)

    expect(newCustomer.isLeft()).toBeTruthy()
    expect(newCustomer.value).toBeInstanceOf(DocumentIsNotValid)
  })
})
