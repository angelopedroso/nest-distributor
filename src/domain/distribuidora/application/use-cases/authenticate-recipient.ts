import { Either, left, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { WrongCredentialsError } from '@/core/errors/errors/wrong-credentials-error'
import { HashCompare } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encrypter'

interface AuthenticateRecipientRequest {
  email: string
  password: string
}

type AuthenticateRecipientResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>

export class AuthenticateRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateRecipientRequest): Promise<AuthenticateRecipientResponse> {
    const recipient = await this.recipientRepository.findByEmail(email)

    if (!recipient) {
      return left(new WrongCredentialsError())
    }
    const passwordMatch = await this.hashCompare.compare(
      password,
      recipient.password,
    )

    if (!passwordMatch) {
      return left(new WrongCredentialsError())
    }

    const encryptedToken = await this.encrypter.encrypt({
      sub: recipient.id.toString(),
    })

    return right({ accessToken: encryptedToken })
  }
}
