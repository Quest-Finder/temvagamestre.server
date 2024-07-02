import type { Validation } from '@/contracts'
import { left, right, type Either } from '@/shared/either'
import Filter from 'bad-words'
export class BadWordValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const filter = new Filter()
    const result = filter.isProfane(input)
    if (result) {
      return left(new Error('Username with bad words'))
    }
    return right()
  }
}
