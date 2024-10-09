import { HashCompare } from '@/domain/distribuidora/application/cryptography/hash-compare'
import { HashGenerator } from '@/domain/distribuidora/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashCompare {
  async generate(plain: string): Promise<string> {
    const hash = plain.concat('-hashed')

    return hash
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    const comparedHash = plain.concat('-hashed') === hash

    return comparedHash
  }
}
