import { type UpdateUserData } from '@/domain/contracts/user'

export type UpdateUserRepoData = Omit<UpdateUserData, 'dateOfBirth'> & {
  dateOfBirth?: Date
}

export interface UpdateUserRepo {
  execute: (data: UpdateUserRepoData) => Promise<void>
}
