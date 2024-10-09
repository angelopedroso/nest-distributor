import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { CreateAddressUseCase } from './create-address'
import { MakeAddress } from 'test/factories/make-address'

let inMemoryAddressRepository: InMemoryAddressRepository

let sut: CreateAddressUseCase

describe('Create Address', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()

    sut = new CreateAddressUseCase(inMemoryAddressRepository)
  })

  it('should be able to create an address', async () => {
    const address = MakeAddress()

    const result = await sut.execute(address)

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toBe({ addressId: expect.any(String) })
  })
})
