import { Entity, UniqueEntityId } from '@/shared/domain'
import { left, right } from '@/shared/either'
import type { RegisterUserData, RegisterUserResponse } from './user-types'
import { DateOfBirth, Name, Pronoun, SocialMedia, Username, type PronounEnum, type SocialMediaProps } from './value-objects'

export type UserProps = {
  name: Name
  username: Username
  pronoun: Pronoun
  dateOfBirth: DateOfBirth
  socialMedias?: SocialMedia[]
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

  get socialMedias (): SocialMediaProps[] | undefined {
    return this.props.socialMedias?.map(socialMedia => socialMedia.value)
  }

  static register (data: RegisterUserData): RegisterUserResponse {
    const { dateOfBirth, pronoun, username, name, socialMedias } = data

    const nameOrError = Name.create(name)
    const usernameOrError = Username.create(username)
    const pronounOrError = Pronoun.create(pronoun)
    const dateOfBirthOrError = DateOfBirth.create(dateOfBirth)
    const socialMediasOrError = socialMedias ? socialMedias.map(socialMedia => SocialMedia.create(socialMedia)) : []

    const results = [usernameOrError, pronounOrError, dateOfBirthOrError, nameOrError, ...socialMediasOrError]

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
          socialMedias: (socialMediasOrError).map(socialMedia => socialMedia.value) as SocialMedia[]
        },
        new UniqueEntityId(data.id)
      )
    )
  }
}
