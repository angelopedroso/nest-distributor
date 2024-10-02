import { Address } from '@/domain/distribuidora/enterprise/entities/address'
import { AddressRepository } from '@/domain/distribuidora/application/repositories/address-repository'

export class InMemoryAddressRepository implements AddressRepository {
  public items: Address[] = []

  async create(address: Address): Promise<void> {
    this.items.push(address)
  }

  async delete(address: Address): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === address.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<Address | null> {
    const address = this.items.find((item) => item.id.toString() === id)

    if (!address) {
      return null
    }

    return address
  }
}
