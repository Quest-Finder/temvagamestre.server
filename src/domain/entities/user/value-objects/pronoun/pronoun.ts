import { ValueObject } from '@/shared/domain'
import { type Either, left, right } from '@/shared/either'
import { InvalidPronounError } from '../../errors'

export type PronounEnum = 'he/his' | 'she/her' | 'they/theirs' | "I don't want to share any pronouns"

export class Pronoun extends ValueObject<PronounEnum> {
  private constructor (pronoun: PronounEnum) {
    super(pronoun)
    Object.freeze(this)
  }

  static create (pronoun: PronounEnum): Either<InvalidPronounError, Pronoun> {
    if (!Pronoun.validate(pronoun)) {
      return left(new InvalidPronounError(pronoun))
    }
    return right(new Pronoun(pronoun))
  }

  private static validate (pronoun: string): boolean {
    if (pronoun !== 'he/his' && pronoun !== 'she/her' && pronoun !== 'they/theirs' && pronoun !== "I don't want to share any pronouns") {
      return false
    }
    return true
  }
}
