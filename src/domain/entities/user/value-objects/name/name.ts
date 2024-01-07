import { type Either, left, right } from '@/shared/either'
import { InvalidNameError } from '../../errors'

type FieldName = 'firstName' | 'lastName'

export class Name {
  private constructor (private readonly name: Record<FieldName, string>) {
    Object.freeze(this)
  }

  static create (name: string, fieldName: FieldName): Either<InvalidNameError, Name> {
    if (!Name.validade(name)) {
      return left(new InvalidNameError(name))
    }
    name = name.trim()
    name = name.replace(/\s+/g, ' ')
    const value = { [fieldName]: name } as unknown as Record<FieldName, string>
    return right(new Name(value))
  }

  private static validade (name: string): boolean {
    const regex = /^.*[!@#$%^&*(),.?":{}|<>0-9_].*$/
    if (regex.test(name)) {
      return false
    }
    return true
  }
}
