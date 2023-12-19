import { type Auth } from '@/domain/contracts/user'
import { AuthUseCase } from '@/usecases/implementations/auth/auth-usecase'
import { makeVerifyTokenClerkAdapterFactory } from '../../infra/auth/clerk/verify-token-clerk-adapter-factory'
import { makeFindExternalAuthMappingByExternalAuthUserIdPrismaRepo } from '../../infra/db/prisma/external-auth-mapping/find-external-auth-mapping-by-external-auth-user-id-prisma-repo-factory'

export const makeAuthUseCase = (): Auth => {
  return new AuthUseCase(
    makeVerifyTokenClerkAdapterFactory(),
    makeFindExternalAuthMappingByExternalAuthUserIdPrismaRepo()
  )
}
