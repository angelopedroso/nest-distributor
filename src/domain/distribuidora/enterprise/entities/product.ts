import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ProductProps {
  name: string
  unit: string
  barCode: string
  stock: number
  imageUrl: string
  price: number
  createdAt: Date
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  get unit() {
    return this.props.unit
  }

  get barCode() {
    return this.props.barCode
  }

  get stock() {
    return this.props.stock
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get price() {
    return this.props.price
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: ProductProps, id?: UniqueEntityID) {
    return new Product(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
  }
}
