import env from '@/configs/env'
import jwt from 'jsonwebtoken'

export class JwtSignAdapterV2 {
  execute (value: string): { token: string } {
    const token = jwt.sign({ payload: value }, env.jwtSecretKey, { expiresIn: '1h' })
    return { token }
  }
}
