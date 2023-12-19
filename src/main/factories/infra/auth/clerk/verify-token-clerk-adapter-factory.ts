import { VerifyTokenClerkAdapter } from '@/infra/auth/clerk/verify-token/verify-token-clerk-adapter'
import { type Decrypter } from '@/usecases/contracts/cryptography/decrypter'

export const makeVerifyTokenClerkAdapterFactory = (): Decrypter => {
  return new VerifyTokenClerkAdapter()
}
