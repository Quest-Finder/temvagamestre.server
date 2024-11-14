import type jwt from 'jsonwebtoken'
export interface TokenPayload extends jwt.JwtPayload {
  externalUserId: string
  email?: string
}

export interface TokenValidation {
  verify: (token) => TokenPayload | undefined
}
