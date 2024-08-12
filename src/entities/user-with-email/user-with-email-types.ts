import { type Either } from '@/shared/either'

export type EmailSignUpUserData = {
  name: string
  password: string
}

export type EmailSignUpUserErrors =
  InvalidEmailError |
  InvalidPasswordError

export type EmailSignUpUserResponse = Either<EmailSignUpUserErrors, UserWithEmail>
