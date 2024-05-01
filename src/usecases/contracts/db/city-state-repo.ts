import { type CityStateProps } from '@/domain/entities/user/value-objects/city-state/city-state'
import { type CityStateModel } from '@/domain/models/city-state/city-state'

export interface CityStateRepo {
  execute: (data: CityStateProps) => Promise<CityStateModel>
}
