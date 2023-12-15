import type { UserModel } from '@/domain/models'

export interface AddUserRepo {
  execute: (data: UserModel) => Promise<void>
}
