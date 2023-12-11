import type { EmailInUseError } from '@/domain/errors'
import type { Either } from '@/shared/either'

export type AddUserData = {
  externalAuthUserId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
}

export type AddUserResponse = Either<EmailInUseError, null>

export interface AddUser {
  perform: (data: AddUserData) => Promise<AddUserResponse>
}
