import { ValueObject } from '@/shared'
import { type Either, left, right } from '@/shared/either'
import { InvalidCityStateError } from '../../errors'

export type CityStateProps = {
  uf?: string
  city?: string
  lifeInBrazil: boolean
}

export class CityState extends ValueObject <CityStateProps> {
  private constructor (props: CityStateProps) {
    super(props)
    Object.freeze(this)
  }

  static create ({ uf, city, lifeInBrazil }: CityStateProps): Either<InvalidCityStateError, CityState> {
    const data = { uf: uf?.trim(), city: city?.trim(), lifeInBrazil }

    if (!CityState.validate(data)) {
      return left(new InvalidCityStateError(data))
    }
    return right(new CityState(data))
  }

  private static validate ({ uf, city, lifeInBrazil }: CityStateProps): boolean {
    if (!lifeInBrazil && !uf && !city) return true
    if (lifeInBrazil && uf?.length === 2 && city) return true
    return false
  }
}
