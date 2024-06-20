import { type CityStateProps } from '../value-objects/city-state/city-state'

export class InvalidCityStateError extends Error {
  constructor ({ uf, city }: CityStateProps) {
    super(`The '${city}/${uf}' is not a valid city/uf.`)
    this.name = 'InvalidCityStateError'
  }
}
