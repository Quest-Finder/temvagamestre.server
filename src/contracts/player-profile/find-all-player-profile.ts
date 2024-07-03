import { type PlayerProfileModel } from '@/models'

export interface FindAllPlayerProfile {
  perform: () => Promise<PlayerProfileModel[]>
}
