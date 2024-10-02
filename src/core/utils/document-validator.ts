export class DocumentValidator {
  public validate(document: string) {
    const documentLenght = document.length

    if (documentLenght > 11) {
      return this.isValidCNPJ(document)
    } else {
      return this.isValidCPF(document)
    }
  }

  protected isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj.length !== 14 || /^(.)\1{13}$/.test(cnpj)) {
      return false
    }

    const calculateCheckDigit = (digits: string) => {
      const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      const sum = digits
        .split('')
        .map(Number)
        .reduce(
          (acc, val, idx) =>
            acc + val * weights[weights.length - digits.length + idx],
          0,
        )
      return sum % 11 < 2 ? 0 : 11 - (sum % 11)
    }

    const firstCheckDigit = calculateCheckDigit(cnpj.slice(0, 12))
    const secondCheckDigit = calculateCheckDigit(cnpj.slice(0, 13))

    return (
      firstCheckDigit === Number(cnpj[12]) &&
      secondCheckDigit === Number(cnpj[13])
    )
  }

  protected isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) {
      return false
    }

    const calculateCheckDigit = (digits: string) => {
      const sum = digits
        .split('')
        .map(Number)
        .reduce((acc, val, idx) => acc + val * (digits.length + 1 - idx), 0)
      return ((sum * 10) % 11) % 10
    }

    const firstCheckDigit = calculateCheckDigit(cpf.slice(0, 9))
    const secondCheckDigit = calculateCheckDigit(cpf.slice(0, 10))

    return (
      firstCheckDigit === Number(cpf[9]) && secondCheckDigit === Number(cpf[10])
    )
  }
}
