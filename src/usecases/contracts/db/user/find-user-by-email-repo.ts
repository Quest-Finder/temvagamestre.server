import type { UserModel } from '@/models'

export interface FindUserByEmailRepo {
  execute: (email: string) => Promise<null | UserModel>
}
