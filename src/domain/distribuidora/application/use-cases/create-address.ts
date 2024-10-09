import { Either, right } from '@/core/either'
import { AddressRepository } from '../repositories/address-repository'
import { Address } from '../../enterprise/entities/address'

export interface CreateAddressUseCaseRequest {
  neighborhood: string
  uf: string
  city: string
  street: string
  cep: string
}

export type CreateAddressUseCaseResponse = Either<null, { addressId: string }>

export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    cep,
    city,
    neighborhood,
    street,
    uf,
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const address = Address.create({
      cep,
      city,
      neighborhood,
      street,
      uf,
    })

    const addressId = address.id.toString()

    await this.addressRepository.create(address)

    return right({ addressId })
  }
}
