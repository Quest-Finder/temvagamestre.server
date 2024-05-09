import { type Either } from '@/shared/either'

import { type InvalidPlayerProfileIdError } from './errors/invalid-plyer-profile-id-error'

import type { InvalidCityStateError, InvalidDateOfBirthError, InvalidNameError, InvalidPronounError, InvalidRpgStyleError, InvalidSocialMediaError, InvalidUsernameError } from './errors'
import { type User } from './user'
import { type PronounEnum, type SocialMediaProps } from './value-objects'
import { type CityStateProps } from './value-objects/city-state/city-state'

export type RegisterUserData = {
  id: string
  name: string
  dateOfBirth: string
  username: string
  pronoun: PronounEnum
  playerProfileId: string
  rpgStyles: string[]
  socialMedias?: SocialMediaProps[]
  title?: string
  bio?: string
  cityState: CityStateProps
}

export type UserEntityErrors =
  InvalidDateOfBirthError |
  InvalidUsernameError |
  InvalidNameError |
  InvalidPronounError |
  InvalidPlayerProfileIdError |
  InvalidRpgStyleError |
  InvalidCityStateError |
  InvalidSocialMediaError

export type RegisterUserResponse = Either<UserEntityErrors, User>
