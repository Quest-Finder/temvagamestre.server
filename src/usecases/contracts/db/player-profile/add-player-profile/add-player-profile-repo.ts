import { type PlayerProfileModel } from '@/domain/models'

export interface AddPlayerProfileRepo {
  execute: (data: PlayerProfileModel) => Promise<void>
}
