import { type Either } from '@/shared/either'
import type { InvalidDateOfBirthError, InvalidNameError, InvalidPronounError, InvalidUsernameError } from './errors'
import { type InvalidPlayerProfileIdError } from './errors/invalid-plyer-profile-id-error'
import { type User } from './user'
import { type PronounEnum } from './value-objects'

export type RegisterUserData = {
  id: string
  name: string
  dateOfBirth: string
  username: string
  pronoun: PronounEnum
  playerProfileId: string
}

export type UserEntityErrors =
  InvalidDateOfBirthError |
  InvalidUsernameError |
  InvalidNameError |
  InvalidPronounError |
  InvalidPlayerProfileIdError

export type RegisterUserResponse = Either<UserEntityErrors, User>
