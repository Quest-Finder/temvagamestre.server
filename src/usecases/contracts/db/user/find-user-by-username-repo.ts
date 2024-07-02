import type { UserModel } from '@/models'

export interface FindUserByUsernameRepo {
  execute: (username: string) => Promise<null | UserModel>
}
