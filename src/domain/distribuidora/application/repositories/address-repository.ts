import { Address } from '../../enterprise/entities/address'

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>
  abstract delete(address: Address): Promise<void>
  abstract findById(id: string): Promise<Address | null>
}
