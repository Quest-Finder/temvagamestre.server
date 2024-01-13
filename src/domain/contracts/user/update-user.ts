import { type UserEntityErrors } from '@/domain/entities/user/user-types'
import { type Either } from '@/shared/either'

export type UpdateUserData = {
  id: string
  firstName?: string
  lastName?: string
  nickname?: string
  phone?: string
  dateOfBirth?: string
}

export type UpdateUserResponse = Either<UserEntityErrors, null>

export interface UpdateUser {
  perform: (data: UpdateUserData) => Promise<UpdateUserResponse>
}
