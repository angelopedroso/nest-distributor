import { Either, left, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'
import { Recipient } from '../../enterprise/entities/recipient'

interface RegisterRecipientRequest {
  name: string
  email: string
  password: string
}

type RegisterRecipientResponse = Either<
  RecipientAlreadyExistsError,
  { recipient: Recipient }
>

export class RegisterRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterRecipientRequest): Promise<RegisterRecipientResponse> {
    const userWithSameEmail = await this.recipientRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new RecipientAlreadyExistsError(email))
    }

    const recipient = Recipient.create({
      name,
      email,
      password,
    })

    await this.recipientRepository.create(recipient)

    return right({ recipient })
  }
}
