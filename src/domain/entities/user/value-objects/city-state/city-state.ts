import { ValueObject } from '@/shared/domain'
import { type Either, left, right } from '@/shared/either'
import { InvalidCityStateError } from '../../errors'

export type CityStateProps = {
  uf: string
  city: string
}

export class CityState extends ValueObject <CityStateProps> {
  private constructor (props: CityStateProps) {
    super(props)
    Object.freeze(this)
  }

  static create (props: CityStateProps): Either<InvalidCityStateError, CityState> {
    const ufTrim = props.uf.trim()
    const cityTrim = props.city.trim()
    if (!CityState.validate({ uf: ufTrim, city: cityTrim })) {
      return left(new InvalidCityStateError({ uf: ufTrim, city: cityTrim }))
    }
    return right(new CityState({ uf: ufTrim, city: cityTrim }))
  }

  private static validate ({ uf, city }: CityStateProps): boolean {
    return uf.length === 2 && !!city
  }
}
