import { MakeRecipient } from 'test/factories/make-recipient'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { RegisterRecipientUseCase } from './register-recipient'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'
import { FakeHasher } from 'test/cryptography/fake-hash'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let fakeHasher: FakeHasher

let sut: RegisterRecipientUseCase

describe('Register Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterRecipientUseCase(inMemoryRecipientRepository, fakeHasher)
  })

  it('should be able to register a new user', async () => {
    const recipient = MakeRecipient({ name: 'John Doe' })

    const newRecipient = await sut.execute(recipient)

    expect(newRecipient.isRight()).toBeTruthy()
    expect(newRecipient.value).toEqual(
      expect.objectContaining({
        recipient: expect.objectContaining({
          props: expect.objectContaining({ name: 'John Doe' }),
        }),
      }),
    )
  })

  it('should not be able to register a new user', async () => {
    const recipient = MakeRecipient({ name: 'John Doe' })

    inMemoryRecipientRepository.items.push(recipient)

    const newRecipient = await sut.execute(recipient)

    expect(newRecipient.isLeft()).toBeTruthy()
    expect(newRecipient.value).toBeInstanceOf(RecipientAlreadyExistsError)
  })
})
