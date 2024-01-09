import { type UpdateUserPreferenceData } from '@/domain/contracts/user'

export interface UpdateUserPreferenceRepo {
  execute: (data: UpdateUserPreferenceData) => Promise<void>
}
