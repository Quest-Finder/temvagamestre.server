import { type InvalidTokenError } from '@/domain/errors'
import { type Either } from '@/shared/either'

export type AuthenticatedUser = {
  userId: string
}

export type AuthResponse = Either<InvalidTokenError, AuthenticatedUser>

export interface Auth {
  perform: (token: string) => Promise<AuthResponse>
}
