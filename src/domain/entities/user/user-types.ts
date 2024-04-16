import { type Either } from '@/shared/either'
import type { InvalidDateOfBirthError, InvalidNameError, InvalidPronounError, InvalidRpgStyleError, InvalidUsernameError } from './errors'
import { type User } from './user'
import { type PronounEnum } from './value-objects'

export type RegisterUserData = {
  id: string
  name: string
  dateOfBirth: string
  username: string
  pronoun: PronounEnum
  rpgStyles: string[]
}

export type UserEntityErrors =
  InvalidDateOfBirthError |
  InvalidUsernameError |
  InvalidNameError |
  InvalidPronounError |
  InvalidRpgStyleError

export type RegisterUserResponse = Either<UserEntityErrors, User>
