import type { RegisterUserData, UserEntityErrors } from '@/domain/entities/user/user-types'
import { type Either } from '@/shared/either'

export type UpdateUserResponse = Either<UserEntityErrors, void>

export interface RegisterUser {
  perform: (data: RegisterUserData) => Promise<UpdateUserResponse>
}
