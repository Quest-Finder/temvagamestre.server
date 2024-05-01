export class CityStateError extends Error {
  constructor () {
    super('county state')
    this.name = 'CountyStateError'
  }
}
