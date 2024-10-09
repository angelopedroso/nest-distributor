import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequestError } from '@/core/errors/errors/bad-request-error'

export interface AddressProps {
  neighborhood: string
  uf: string
  city: string
  street: string
  cep: string
}

export class Address extends Entity<AddressProps> {
  get neighborhood() {
    return this.props.neighborhood
  }

  get street() {
    return this.props.street
  }

  get uf() {
    return this.props.uf
  }

  set uf(uf: string) {
    if (uf.length !== 2) {
      throw new BadRequestError('UF')
    }

    this.props.uf = uf.toUpperCase()
  }

  get city() {
    return this.props.city
  }

  get cep() {
    return this.props.cep
  }

  static create(address: AddressProps, id?: UniqueEntityID) {
    return new Address(address, id)
  }
}
