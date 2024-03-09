import { type Either } from '@/shared/either'
import type { InvalidDateOfBirthError, InvalidNameError, InvalidPronounError, InvalidUsernameError } from './errors'
import { type User } from './user'
import { type PronounEnum } from './value-objects'

export type RegisterUserData = {
  id: string
  name: string
  dateOfBirth: string
  username: string
  pronoun: PronounEnum
}

export type UserEntityErrors =
  InvalidDateOfBirthError |
  InvalidUsernameError |
  InvalidNameError |
  InvalidPronounError

export type UpdateUserResponse = Either<UserEntityErrors, User>
