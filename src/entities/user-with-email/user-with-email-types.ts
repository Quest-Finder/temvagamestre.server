import { type Either } from '@/shared/either'
import { type InvalidEmailError } from './errors/invalid-email-error'
import { type InvalidPasswordError } from './errors/invalid-password-error'
import { type UserWithEmail } from './user-with-email'

export type SignUpWithEmailData = {
  id: string
  email: string
  password: string
}

export type SignUpWithEmailErrors =
  InvalidEmailError |
  InvalidPasswordError

export type SignUpWithEmailResponse = Either<SignUpWithEmailErrors, UserWithEmail>
