import { PaginationParams } from '@/core/repositories/pagination-params'
import { CustomerRepository } from '@/domain/distribuidora/application/repositories/customer-repository'
import { Customer } from '@/domain/distribuidora/enterprise/entities/customer'
import { CustomerWithAddress } from '@/domain/distribuidora/enterprise/entities/value-objects/customer-with-address'
import { InMemoryAddressRepository } from './in-memory-address-repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  public items: Customer[] = []

  constructor(private addressRepository: InMemoryAddressRepository) {}

  async create(customer: Customer): Promise<void> {
    const customerWithSameDocument = this.items.find(
      (item) => item.document === customer.document,
    )

    if (customerWithSameDocument) {
      throw new Error(
        `Cliente com o documento "${customerWithSameDocument.document}" já existe!`,
      )
    }

    this.items.push(customer)
  }

  async save(customer: Customer): Promise<void> {
    const existentCustomer = this.items.findIndex(
      (item) => item.id === customer.id,
    )

    this.items[existentCustomer] = customer
  }

  async delete(customer: Customer): Promise<void> {
    const existentCustomer = this.items.findIndex(
      (item) => item.id === customer.id,
    )

    this.items.splice(existentCustomer, 1)
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.id.toString() === id)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByDocument(document: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.document === document)

    if (!customer) {
      return null
    }

    return customer
  }

  async findManyByRecipientIdWithAddress(
    recipientId: string,
    { page, skip }: PaginationParams,
  ): Promise<CustomerWithAddress[]> {
    const customers = this.items
      .filter((item) => item.recipientId.toString() === recipientId)
      .slice((page - 1) * skip, page * skip)
      .map((customer) => {
        const address = this.addressRepository.items.find((item) =>
          item.id.equals(customer.addressId),
        )

        if (!address) {
          throw new Error(
            `Endereço com ID "${customer.addressId.toString()}" não existe`,
          )
        }

        return CustomerWithAddress.create({
          addressId: address.id,
          cep: address.cep,
          city: address.city,
          createdAt: customer.createdAt,
          customerId: customer.id,
          document: customer.document,
          email: customer.email,
          name: customer.name,
          neighborhood: address.neighborhood,
          phone: customer.phone,
          street: address.street,
          type: customer.type,
          uf: address.uf,
          stateRegistration: customer.stateRegistration,
        })
      })

    return customers
  }

  async findByIdWithAddress(id: string): Promise<CustomerWithAddress | null> {
    const customer = this.items.find((item) => item.id.toString() === id)

    if (!customer) {
      return null
    }

    const address = this.addressRepository.items.find((item) =>
      item.id.equals(customer.addressId),
    )

    if (!address) {
      throw new Error(
        `Endereço com ID "${customer.addressId.toString()}" não existe`,
      )
    }

    return CustomerWithAddress.create({
      addressId: address.id,
      cep: address.cep,
      city: address.city,
      createdAt: customer.createdAt,
      customerId: customer.id,
      document: customer.document,
      email: customer.email,
      name: customer.name,
      neighborhood: address.neighborhood,
      phone: customer.phone,
      street: address.street,
      type: customer.type,
      uf: address.uf,
      stateRegistration: customer.stateRegistration,
    })
  }
}
