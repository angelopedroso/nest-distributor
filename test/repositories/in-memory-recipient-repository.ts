import { RecipientRepository } from '@/domain/distribuidora/application/repositories/recipient-repository'
import { Recipient } from '@/domain/distribuidora/enterprise/entities/recipient'

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = []

  async findByEmail(email: string): Promise<Recipient | null> {
    const recipient = this.items.find((item) => item.email === email)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }
}
