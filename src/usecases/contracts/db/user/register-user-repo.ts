import { type User } from '@/entities/user'

export type RegisterUserRepoProps = {
  user: User
  cityStateId?: string
}

export interface RegisterUserRepo {
  execute: (props: RegisterUserRepoProps) => Promise<void>
}
