import { type Encrypter } from '@/usecases/contracts/cryptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtSignAdapter implements Encrypter {
  constructor (private readonly secretKey: string) {}

  execute (value: string): { token: string } {
    const token = jwt.sign({ clerkUserId: value }, this.secretKey, { expiresIn: '1h' })
    return { token }
  }
}
