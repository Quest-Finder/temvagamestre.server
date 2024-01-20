import { type AddGamePlaceData } from '@/domain/contracts/user'

export interface AddOrUpdateGamePlaceRepo {
  execute: (data: AddGamePlaceData) => Promise<void>
}
