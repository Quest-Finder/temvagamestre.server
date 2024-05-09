import { InvalidCityStateError } from '../../errors'
import { CityState } from './city-state'

const props = {
  city: 'any_city',
  uf: 'any_uf'
}

describe('Username ValueObject', () => {
  it('Should return InvalidCityStateError if uf length is diferent of 2', () => {
    const result = CityState.create(props)
    expect(result.value).toEqual(new InvalidCityStateError(props))
  })
})
