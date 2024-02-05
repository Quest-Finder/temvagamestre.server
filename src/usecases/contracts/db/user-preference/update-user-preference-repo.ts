import type { ActiveType, Frequency } from '@/domain/models'

export type UpdateUserPreferenceRepoData = {
  id: string
  frequency?: Frequency
  activeType?: ActiveType
}

export interface UpdateUserPreferenceRepo {
  execute: (data: UpdateUserPreferenceRepoData) => Promise<void>
}
