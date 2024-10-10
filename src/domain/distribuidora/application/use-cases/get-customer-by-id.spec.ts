import { InMemoryCustomerRepository } from 'test/repositories/in-memory-customer-repository'
import { GetCustomerByIdUseCase } from './get-customer-by-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { MakeAddress } from 'test/factories/make-address'
import { MakeCustomer } from 'test/factories/make-customer'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryCustomerRepository: InMemoryCustomerRepository
let inMemoryAddressRepository: InMemoryAddressRepository

let sut: GetCustomerByIdUseCase

describe('Get Customer By Id', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryCustomerRepository = new InMemoryCustomerRepository(
      inMemoryAddressRepository,
    )

    sut = new GetCustomerByIdUseCase(inMemoryCustomerRepository)
  })

  it('should be able to get a customer by id', async () => {
    const address = MakeAddress()
    const customer = MakeCustomer({
      addressId: address.id,
    })

    inMemoryAddressRepository.items.push(address)
    inMemoryCustomerRepository.items.push(customer)

    const customerId = customer.id.toString()

    const newCustomer = await sut.execute({ id: customerId })

    expect(newCustomer.isRight()).toBeTruthy()
    expect(newCustomer.value).toEqual({
      customer: expect.objectContaining({
        addressId: address.id,
      }),
    })
  })

  it('should not be able to get a customer by id', async () => {
    const customer = MakeCustomer()

    const customerId = customer.id.toString()

    const newCustomer = await sut.execute({ id: customerId })

    expect(newCustomer.isLeft()).toBeTruthy()
    expect(newCustomer.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
