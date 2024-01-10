import { type AddUserPreferenceData } from '@/domain/contracts/user/add-user-preference'

export interface AddUserPreferenceRepo {
  execute: (data: AddUserPreferenceData) => Promise<void>
}
