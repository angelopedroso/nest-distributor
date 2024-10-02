import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Customer,
  CustomerProps,
} from '@/domain/distribuidora/enterprise/entities/customer'
import { faker } from '@faker-js/faker'

export function MakeCustomer(
  override?: Partial<CustomerProps>,
  id?: UniqueEntityID,
) {
  return Customer.create(
    {
      addressId: new UniqueEntityID(),
      recipientId: new UniqueEntityID(),
      document: '69119164000139',
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      ...override,
    },
    id,
  )
}
