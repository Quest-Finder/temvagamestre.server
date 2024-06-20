import { type Auth } from '@/contracts/user'
import { AuthUseCase } from '@/usecases/implementations/auth/auth-usecase'
import { makeFindExternalAuthMappingByExternalAuthUserIdPrismaRepo } from '../../infra/db/prisma/external-auth-mapping/find-external-auth-mapping-by-external-auth-user-id-prisma-repo-factory'
import { makeJwtVerifyAdapter } from '../../infra/cryptography/jwt-verify-adapter-factory'

export const makeAuthUseCase = (): Auth => {
  return new AuthUseCase(
    makeJwtVerifyAdapter(),
    makeFindExternalAuthMappingByExternalAuthUserIdPrismaRepo()
  )
}
