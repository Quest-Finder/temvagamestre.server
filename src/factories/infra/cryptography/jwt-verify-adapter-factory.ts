import { JwtVerifyAdapter } from '@/infra/cryptography/jwt-verify-adapter'
import env from '@/configs/env'
import { type Decrypter } from '@/usecases/contracts/cryptography/decrypter'

export const makeJwtVerifyAdapter = (): Decrypter => {
  return new JwtVerifyAdapter(env.clerkJwtSecretKey)
}
