import { JwtSignAdapter } from '@/infra/cryptography/jwt-sign-adapter'
import env from '@/configs/env'
import { type Encrypter } from '@/usecases/contracts/cryptography/encrypter'

export const makeJwtSignAdapter = (): Encrypter => {
  return new JwtSignAdapter(env.clerkJwtSecretKey)
}
