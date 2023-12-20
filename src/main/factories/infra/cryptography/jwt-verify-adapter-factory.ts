import { JwtVerifyAdapter } from '@/infra/cryptography/jwt-adapter/jwt-verify-adapter'
import env from '@/main/configs/env'
import { type Decrypter } from '@/usecases/contracts/cryptography/decrypter'

export const makeJwtVerifyAdapter = (): Decrypter => {
  return new JwtVerifyAdapter(env.clerkJwtSecretKey)
}
