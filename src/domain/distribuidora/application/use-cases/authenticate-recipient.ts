import { Either, left, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { WrongCredentialsError } from '@/core/errors/errors/wrong-credentials-error'

interface AuthenticateRecipientRequest {
  email: string
  password: string
}

type AuthenticateRecipientResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>

export class AuthenticateRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRecipientRequest): Promise<AuthenticateRecipientResponse> {
    const recipient = await this.recipientRepository.findByEmail(email)

    if (!recipient) {
      return left(new WrongCredentialsError())
    }

    if (recipient.password !== password) {
      return left(new WrongCredentialsError())
    }

    return right({ accessToken: recipient.id })
  }
}
