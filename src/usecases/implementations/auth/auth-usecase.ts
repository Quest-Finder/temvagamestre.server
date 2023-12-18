import type { FindExternalAuthMappingByExternalAuthUserIdRepo } from '@/usecases/contracts/db/external-auth-mapping'
import type { AuthResponse, Auth } from '@/domain/contracts/user'
import type { Decrypter } from '@/usecases/contracts/cryptography/decrypter'
import { left, right } from '@/shared/either'
import { InvalidTokenError } from '@/domain/errors'

export class AuthUseCase implements Auth {
  constructor (
    private readonly descrypter: Decrypter,
    private readonly findExternalAuthMappingByExternalAuthUserIdRepo: FindExternalAuthMappingByExternalAuthUserIdRepo
  ) {}

  async perform (token: string): Promise<AuthResponse> {
    const externalAuthUserId = await this.descrypter.execute(token)
    if (!externalAuthUserId) {
      return left(new InvalidTokenError())
    }
    await this.findExternalAuthMappingByExternalAuthUserIdRepo.execute(externalAuthUserId)
    return right({ userId: '' })
  }
}
