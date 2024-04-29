import type { UserModel } from '@/domain/models'

export interface FindUserByUsernameRepo {
  execute: (username: string) => Promise<null | UserModel>
}
