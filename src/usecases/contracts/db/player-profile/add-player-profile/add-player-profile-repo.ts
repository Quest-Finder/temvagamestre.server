import { type PlayerProfileModel } from '@/models'

export interface AddPlayerProfileRepo {
  execute: (data: PlayerProfileModel) => Promise<void>
}
