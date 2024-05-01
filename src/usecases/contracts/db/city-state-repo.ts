import { type CityStateProps } from '@/domain/entities/user/value-objects/city-state/city-state'

export interface CityStateRepo {
  execute: (data: CityStateProps) => Promise<void>
}
