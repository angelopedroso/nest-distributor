import { InMemoryCustomerRepository } from 'test/repositories/in-memory-customer-repository'
import { FetchCustomerUseCase } from './fetch-customer'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { MakeRecipient } from 'test/factories/make-recipient'
import { MakeCustomer } from 'test/factories/make-customer'
import { MakeAddress } from 'test/factories/make-address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryCustomerRepository: InMemoryCustomerRepository
let inMemoryAddressRepository: InMemoryAddressRepository

let inMemoryRecipientRepository: InMemoryRecipientRepository

let sut: FetchCustomerUseCase

describe('Fetch Customer', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryCustomerRepository = new InMemoryCustomerRepository(
      inMemoryAddressRepository,
    )

    inMemoryRecipientRepository = new InMemoryRecipientRepository()

    sut = new FetchCustomerUseCase(inMemoryCustomerRepository)
  })

  it('should be able to fetch customer with your respective address', async () => {
    const recipient = MakeRecipient()

    inMemoryRecipientRepository.items.push(recipient)

    const recipientId = recipient.id.toString()

    for (let i = 1; i <= 3; i++) {
      const address = MakeAddress({}, new UniqueEntityID(i.toString()))

      inMemoryAddressRepository.items.push(address)

      const customer = MakeCustomer({
        recipientId: recipient.id,
        addressId: address.id,
      })

      inMemoryCustomerRepository.items.push(customer)
    }

    const customer = await sut.execute({ recipientId, page: 1 })

    expect(customer.isRight()).toBeTruthy()
    expect(customer.value?.customer).toHaveLength(3)
    expect(customer.value?.customer).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          document: '69119164000139',
        }),
      ]),
    )
  })

  it('should be able to paginate customers', async () => {
    const recipient = MakeRecipient()

    inMemoryRecipientRepository.items.push(recipient)

    const recipientId = recipient.id.toString()

    for (let i = 1; i <= 22; i++) {
      const address = MakeAddress({}, new UniqueEntityID(i.toString()))

      inMemoryAddressRepository.items.push(address)

      const customer = MakeCustomer({
        recipientId: recipient.id,
        addressId: address.id,
      })

      inMemoryCustomerRepository.items.push(customer)
    }

    const customer = await sut.execute({ recipientId, page: 2 })

    expect(customer.isRight()).toBeTruthy()
    expect(customer.value?.customer).toHaveLength(2)
    expect(customer.value?.customer).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          document: '69119164000139',
        }),
      ]),
    )
  })
})
