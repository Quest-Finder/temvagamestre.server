import { InvalidCityStateError } from '../../errors'
import { CityState } from './city-state'

const props = {
  city: 'any_city',
  uf: 'uf',
  lifeInBrazil: true
}

describe('Username ValueObject', () => {
  it('Should return InvalidCityStateError if uf length is diferent of 2', () => {
    const newProps = { ...props, uf: 'any_uf' }
    const result = CityState.create(newProps)
    expect(result.value).toEqual(new InvalidCityStateError(newProps))
  })

  it('Should return InvalidCityStateError if uf is correct but city is empty', () => {
    const newProps = { ...props, city: '' }
    const result = CityState.create(newProps)
    expect(result.value).toEqual(new InvalidCityStateError(newProps))
  })

  it("Should return InvalidCityStateError if lifeInBrazil is false but uf and city aren't empty", () => {
    const newProps = { ...props, lifeInBrazil: false }
    const result = CityState.create(newProps)
    expect(result.value).toEqual(new InvalidCityStateError(newProps))
  })

  it('Should return success if lifeInBrazil is false and uf and city are empty', () => {
    const newProps = { uf: '', city: '', lifeInBrazil: false }
    const result = CityState.create(newProps)
    expect(result.value).toEqual({ props: newProps })
  })

  it('Should return success if lifeInBrazil is true and uf and city are correct', () => {
    const result = CityState.create(props)
    expect(result.value).toEqual({ props })
  })
})
