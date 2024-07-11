import { type PlayerProfileModel } from '@/models'

export interface FindAllPlayerProfileRepo {
  execute: () => Promise<PlayerProfileModel[]>
}
