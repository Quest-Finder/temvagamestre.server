import type { AuthResponse, Auth } from '@/domain/contracts/user'
import type { Decrypter } from '@/usecases/contracts/cryptography/decrypter'
import { left, right } from '@/shared/either'
import { InvalidTokenError } from '@/domain/errors'

export class AuthUseCase implements Auth {
  constructor (private readonly descrypter: Decrypter) {}

  async perform (token: string): Promise<AuthResponse> {
    const value = await this.descrypter.execute(token)
    if (!value) {
      return left(new InvalidTokenError())
    }
    return right({ userId: '' })
  }
}
