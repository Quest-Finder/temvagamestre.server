import env from '@/configs/env'
import jwt from 'jsonwebtoken'
import { type TokenPayload, type TokenValidation } from '../token-validation'

export class ClerkTokenValidation implements TokenValidation {
  verify (token: any): TokenPayload | undefined {
    try {
      const { clerkUserId, ...rest } = jwt.verify(token, env.clerkJwtSecretKey) as jwt.JwtPayload
      return {
        externalUserId: clerkUserId,
        ...rest
      }
    } catch (error) {
      return undefined
    }
  }
}
