import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RecipientProps {
  name: string
  email: string
  password: string
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id)

    return recipient
  }
}
