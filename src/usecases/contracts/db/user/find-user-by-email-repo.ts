import type { UserModel } from '@/domain/models'

export interface FindUserByEmailRepo {
  execute: (email: string) => Promise<null | UserModel>
}
