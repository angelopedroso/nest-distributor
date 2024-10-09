import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Address,
  AddressProps,
} from '@/domain/distribuidora/enterprise/entities/address'
import { faker } from '@faker-js/faker'

export function MakeAddress(
  override?: Partial<AddressProps>,
  id?: UniqueEntityID,
) {
  return Address.create(
    {
      cep: faker.location.zipCode('########'),
      city: faker.location.city(),
      neighborhood: faker.location.street(),
      street: faker.location.streetAddress(),
      uf: faker.location.state({ abbreviated: true }),
      ...override,
    },
    id,
  )
}
