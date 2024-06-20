import type { AccessDeniedError, InvalidTokenError } from '@/errors'
import type { Either } from '@/shared/either'

export type AuthenticatedUser = {
  userId: string
}

export type AuthResponse = Either<InvalidTokenError | AccessDeniedError, AuthenticatedUser>

export interface Auth {
  perform: (token: string) => Promise<AuthResponse>
}
