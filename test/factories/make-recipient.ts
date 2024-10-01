import { Recipient } from '@/domain/distribuidora/enterprise/entities/recipient'
import { faker } from '@faker-js/faker'

export function MakeRecipient(override: Partial<Recipient> = {}, id?: string) {
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
