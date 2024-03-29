import { type UserModel } from '@/domain/models'
import { type Either } from '@/shared/either'

export type FindUserByIdData = {
  userId: string
}

export type FindUserByIdResponse = Either<Error, UserModel>

export interface FindUserById {
  perform: (data: FindUserByIdData) => Promise<FindUserByIdResponse>

}
