import { type UserModel } from '@/models'
import { type Either } from '@/shared/either'

export type CheckUserByIdResponse = Either<Error, UserModel>

export interface CheckUserById {
  perform: (id: string) => Promise<CheckUserByIdResponse>
}
