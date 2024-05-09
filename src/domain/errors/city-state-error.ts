export class CityStateError extends Error {
  constructor () {
    super('city state')
    this.name = 'CityStateError'
  }
}
