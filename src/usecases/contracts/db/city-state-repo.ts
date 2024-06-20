import { type CityStateProps } from '@/entities/user/value-objects/city-state/city-state'
import { type CityStateModel } from '@/models/city-state'

export interface CityStateRepo {
  execute: (data: CityStateProps) => Promise<CityStateModel>
}
