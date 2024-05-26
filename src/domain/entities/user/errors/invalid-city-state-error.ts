import { type CityStateProps } from '../value-objects/city-state/city-state'

export class InvalidCityStateError extends Error {
  constructor ({ uf, city }: CityStateProps) {
    super(`The '${city}/${uf}' is not a valid city/uf.`)
    this.name = 'InvalidCityStateError'
  }
}

export class InvalidCityStateInBrazilError extends Error {
  constructor () {
    super('Uf and city should not be sent by residents outside Brazil')
    this.name = 'InvalidCityStateInBrazilError'
  }
}
