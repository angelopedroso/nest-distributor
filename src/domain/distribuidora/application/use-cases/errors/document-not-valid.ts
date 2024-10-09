import { UseCaseError } from '@/core/errors/use-case.error'

export class DocumentIsNotValid extends Error implements UseCaseError {
  constructor(identifier?: string) {
    super(`Documento "${identifier}" não é válido`)
  }
}
