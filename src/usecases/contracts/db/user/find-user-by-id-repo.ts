import type { UserModel } from '@/models'

export interface FindUserByIdRepo {
  execute: (id: string) => Promise<null | UserModel>
}
