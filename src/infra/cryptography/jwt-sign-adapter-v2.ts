import env from '@/configs/env'
import { type Encrypter } from '@/usecases/contracts/cryptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtSignAdapterV2 implements Encrypter {
  execute (value: string): { token: string } {
    const token = jwt.sign({ payload: value }, env.jwtSecretKey, { expiresIn: '1h' })
    return { token }
  }
}
