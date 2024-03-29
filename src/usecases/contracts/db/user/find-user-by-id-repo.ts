import { type UserModel } from '@/domain/models'

export interface FindUserByIdRepo {
  execute: (userId: string) => Promise<null | UserModel>
}
