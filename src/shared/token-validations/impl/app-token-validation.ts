import env from '@/configs/env'
import jwt from 'jsonwebtoken'
import { type TokenPayload, type TokenValidation } from '../token-validation'

export class AppTokenValidation implements TokenValidation {
  verify (token: any): TokenPayload | undefined {
    try {
      const { payload, ...rest } = jwt.verify(token, env.jwtSecretKey) as jwt.JwtPayload
      return {
        externalUserId: payload.userId,
        email: payload.email,
        ...rest
      }
    } catch (error) {
      return undefined
    }
  }
}
