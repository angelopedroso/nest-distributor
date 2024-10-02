import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

interface CustomerWithAddressProps {
  customerId: UniqueEntityID
  addressId: UniqueEntityID
  neighborhood: string
  uf: string
  city: string
  street: string
  cep: string
  name: string
  document: string
  type: 'fisíca' | 'jurídica'
  stateRegistration?: string
  phone: string
  email: string
  createdAt: Date
}

export class CustomerWithAddress extends ValueObject<CustomerWithAddressProps> {
  get customerId() {
    return this.props.customerId
  }

  get addressId() {
    return this.props.addressId
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  get uf() {
    return this.props.uf
  }

  get city() {
    return this.props.city
  }

  get street() {
    return this.props.street
  }

  get cep() {
    return this.props.cep
  }

  get name() {
    return this.props.name
  }

  get document() {
    return this.props.document
  }

  get type() {
    return this.props.type
  }

  get stateRegistration() {
    return this.props.stateRegistration
  }

  get phone() {
    return this.props.phone
  }

  get email() {
    return this.props.email
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: CustomerWithAddressProps) {
    return new CustomerWithAddress(props)
  }
}
