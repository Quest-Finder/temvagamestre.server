import type { UserModel } from '@/models'

export interface AddUserRepo {
  execute: (data: UserModel) => Promise<void>
}
