import { UseCaseError } from '../use-case.error'

export class BadRequestError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Dados de "${identifier}" inválido`)
  }
}
