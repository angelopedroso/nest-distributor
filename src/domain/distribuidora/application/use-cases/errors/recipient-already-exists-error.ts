import { UseCaseError } from '@/core/errors/use-case.error'

export class RecipientAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Usuário "${identifier}" já existe`)
  }
}
