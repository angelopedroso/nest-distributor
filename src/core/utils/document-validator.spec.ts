import { DocumentValidator } from './document-validator'

let sut: DocumentValidator

describe('Document Validator', () => {
  beforeEach(() => {
    sut = new DocumentValidator()
  })

  it('should be able to validate CNPJ', () => {
    const randomCNPJ = '69119164000139'
    const isValid = sut.validate(randomCNPJ)

    expect(isValid).toBeTruthy()
  })

  it('should be able to validate CPF', () => {
    const randomCPF = '38193524063'
    const isValid = sut.validate(randomCPF)

    expect(isValid).toBeTruthy()
  })

  it('should not be able to validate a document', () => {
    const randomCPF = '38193524062'
    const isValid = sut.validate(randomCPF)

    expect(isValid).toBeFalsy()
  })
})
