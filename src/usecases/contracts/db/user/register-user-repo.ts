import { type User } from '@/domain/entities/user'

export type RegisterUserRepoProps = {
  user: User
  cityStateId?: string
}

export interface RegisterUserRepo {
  execute: (props: RegisterUserRepoProps) => Promise<void>
}
