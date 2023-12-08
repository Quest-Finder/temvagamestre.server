import type { EmailInUseError } from '@/domain/errors'
import type { Either } from '@/shared/either'

export type AddUserData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth: Date
}

export type AddUserResponse = Either<EmailInUseError, null>

export interface AddUser {
  perform: (data: AddUserData) => Promise<AddUserResponse>
}
