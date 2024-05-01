import { type CityStateProps } from '@/domain/entities/user/value-objects/city-state/city-state'

export interface IBGEService {
  execute: ({ uf, city }: CityStateProps) => Promise<boolean>
}
