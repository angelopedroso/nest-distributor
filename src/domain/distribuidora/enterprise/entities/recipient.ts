import { Entity } from '@/core/entities/entity'

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

  static create(props: RecipientProps, id?: string) {
    const recipient = new Recipient(props, id)

    return recipient
  }
}
