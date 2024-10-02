import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CustomerProps {
  recipientId: UniqueEntityID
  addressId: UniqueEntityID
  name: string
  document: string
  type: 'fisíca' | 'jurídica'
  stateRegistration?: string
  phone: string
  email: string
  createdAt: Date
}

export class Customer extends Entity<CustomerProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get addressId() {
    return this.props.addressId
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

  static create(
    props: Optional<CustomerProps, 'type' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const type = props.document.length > 11 ? 'jurídica' : 'fisíca'

    const customer = new Customer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        type,
      },
      id,
    )

    return customer
  }
}
