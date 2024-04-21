import { type User } from '@/domain/entities/user'

export interface RegisterUserRepo {
  execute: (user: User) => Promise<void>
}
