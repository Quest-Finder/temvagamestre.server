import { Entity, UniqueEntityId } from '@/shared/domain'
import { left, right } from '@/shared/either'
import type { RegisterUserData, RegisterUserResponse } from './user-types'
import { DateOfBirth, Name, Pronoun, type PronounEnum, RpgStyle, Username } from './value-objects'

export type UserProps = {
  name: Name
  username: Username
  pronoun: Pronoun
  dateOfBirth: DateOfBirth
  rpgStyles: RpgStyle[]
}
export class User extends Entity<UserProps> {
  private constructor (props: UserProps, id?: UniqueEntityId) {
    super(props, id)
    Object.freeze(this)
  }

  get name (): string {
    return this.props.name.value
  }

  get username (): string {
    return this.props.username.value
  }

  get pronoun (): PronounEnum {
    return this.props.pronoun.value
  }

  get dateOfBirth (): Date {
    return this.props.dateOfBirth.value
  }

  get rpgStyles (): string[] {
    return this.props.rpgStyles.map((rpgStyle) => rpgStyle.value)
  }

  static register (data: RegisterUserData): RegisterUserResponse {
    const { dateOfBirth, pronoun, username, name, rpgStyles } = data

    const nameOrError = Name.create(name)
    const usernameOrError = Username.create(username)
    const pronounOrError = Pronoun.create(pronoun)
    const dateOfBirthOrError = DateOfBirth.create(dateOfBirth)
    const rpgStyleOrError = rpgStyles.map((rpgStyle) => RpgStyle.create(rpgStyle))

    const results = [usernameOrError, pronounOrError, dateOfBirthOrError, nameOrError, ...rpgStyleOrError]
    for (const result of results) {
      if (result.isLeft()) return left(result.value)
    }

    return right(
      new User(
        {
          name: nameOrError.value as Name,
          username: usernameOrError.value as Username,
          pronoun: pronounOrError.value as Pronoun,
          dateOfBirth: dateOfBirthOrError.value as DateOfBirth,
          rpgStyles: rpgStyleOrError.map((rpgStyle) => rpgStyle.value) as RpgStyle[]
        },
        new UniqueEntityId(data.id)
      )
    )
  }
}
