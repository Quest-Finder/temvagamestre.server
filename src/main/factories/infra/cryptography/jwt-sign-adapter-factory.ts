import { JwtSignAdapter } from '@/infra/cryptography/jwt-adapter/sign/jwt-sign-adapter'
import env from '@/main/configs/env'
import { type Encrypter } from '@/usecases/contracts/cryptography/encrypter'

export const makeJwtSignAdapter = (): Encrypter => {
  return new JwtSignAdapter(env.clerkJwtSecretKey)
}
