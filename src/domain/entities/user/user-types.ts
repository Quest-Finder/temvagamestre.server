import { type Either } from '@/shared/either'
import type { InvalidDateOfBirthError, InvalidNameError, InvalidPronounError, InvalidUsernameError } from './errors'
import { type User } from './user'
import { type PronounEnum, type SocialMediaProps } from './value-objects'

export type RegisterUserData = {
  id: string
  name: string
  dateOfBirth: string
  username: string
  pronoun: PronounEnum
  socialMedias?: SocialMediaProps[]
  title?: string
  bio?: string

}

export type UserEntityErrors =
  InvalidDateOfBirthError |
  InvalidUsernameError |
  InvalidNameError |
  InvalidPronounError

export type RegisterUserResponse = Either<UserEntityErrors, User>
