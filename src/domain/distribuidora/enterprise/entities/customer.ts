import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DocumentValidator } from '@/core/utils/document-validator'
import { DocumentIsNotValid } from '../../application/use-cases/errors/document-not-valid'

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

  set name(name: string) {
    this.props.name = name
  }

  get document() {
    return this.props.document
  }

  set document(document: string) {
    const documentValidator = new DocumentValidator()
    const isValid = documentValidator.validate(document)

    if (!isValid) {
      throw new DocumentIsNotValid(document)
    }

    this.props.document = document

    this.touch(document)
  }

  get type() {
    return this.props.type
  }

  get stateRegistration() {
    return this.props.stateRegistration
  }

  set stateRegistration(sr: string | undefined) {
    this.props.stateRegistration = sr
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get createdAt() {
    return this.props.createdAt
  }

  protected touch(document: string) {
    const type = document.length > 11 ? 'jurídica' : 'fisíca'

    this.props.type = type
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

    customer.document = props.document

    return customer
  }
}
