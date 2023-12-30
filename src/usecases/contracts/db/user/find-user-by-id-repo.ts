import { type UserModel } from '@/domain/models'

export interface FindUserByIdRepo {
  execute: (id: string) => Promise<UserModel | null>
}
