import { Either, left, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'
import { Recipient } from '../../enterprise/entities/recipient'
import { HashGenerator } from '../cryptography/hash-generator'

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
  constructor(
    private recipientRepository: RecipientRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: RegisterRecipientRequest): Promise<RegisterRecipientResponse> {
    const userWithSameEmail = await this.recipientRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new RecipientAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.generate(password)

    const recipient = Recipient.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.recipientRepository.create(recipient)

    return right({ recipient })
  }
}
