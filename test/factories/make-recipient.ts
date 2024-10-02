import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/distribuidora/enterprise/entities/recipient'
import { faker } from '@faker-js/faker'

export function MakeRecipient(
  override: Partial<Recipient> = {},
  id?: UniqueEntityID,
) {
  return Recipient.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
}
