import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { AuthenticateRecipientUseCase } from './authenticate-recipient'
import { MakeRecipient } from 'test/factories/make-recipient'
import { WrongCredentialsError } from '@/core/errors/errors/wrong-credentials-error'
import { FakeHasher } from 'test/cryptography/fake-hash'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'

let inMemoryStudentRepository: InMemoryRecipientRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateRecipientUseCase

describe('Authenticate recipient', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryRecipientRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateRecipientUseCase(
      inMemoryStudentRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a recipient', async () => {
    const hashedPassword = await fakeHasher.generate('123456')
    const recipient = MakeRecipient({
      email: 'johndoe@email.com',
      password: hashedPassword,
    })

    inMemoryStudentRepository.items.push(recipient)

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
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
