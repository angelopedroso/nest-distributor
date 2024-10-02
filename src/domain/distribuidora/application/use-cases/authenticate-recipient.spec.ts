import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { AuthenticateRecipientUseCase } from './authenticate-recipient'
import { MakeRecipient } from 'test/factories/make-recipient'
import { WrongCredentialsError } from '@/core/errors/errors/wrong-credentials-error'

let inMemoryStudentRepository: InMemoryRecipientRepository
let sut: AuthenticateRecipientUseCase

describe('Authenticate recipient', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryRecipientRepository()

    sut = new AuthenticateRecipientUseCase(inMemoryStudentRepository)
  })

  it('should be able to authenticate a recipient', async () => {
    const recipient = MakeRecipient()

    inMemoryStudentRepository.items.push(recipient)

    const result = await sut.execute({
      email: recipient.email,
      password: recipient.password,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toStrictEqual({ accessToken: recipient.id })
  })

  it('should not be able to authenticate a recipient', async () => {
    const recipient = MakeRecipient()

    inMemoryStudentRepository.items.push(recipient)

    const result = await sut.execute({
      email: recipient.email,
      password: '123456',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
