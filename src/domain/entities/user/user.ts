import { Entity, UniqueEntityId } from '@/shared/domain'
import { left, right } from '@/shared/either'
import type { RegisterUserData, RegisterUserResponse } from './user-types'
import { Bio, DateOfBirth, Name, Pronoun, SocialMedia, Username, type PronounEnum, type SocialMediaProps, Title, RpgStyle } from './value-objects'

export type UserProps = {
  name: Name
  username: Username
  pronoun: Pronoun
  dateOfBirth: DateOfBirth
  rpgStyles: RpgStyle[]
  socialMedias?: SocialMedia[]
  title?: Title
  bio?: Bio
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

  get socialMedias (): SocialMediaProps[] | undefined {
    return this.props.socialMedias?.map(socialMedia => socialMedia.value)
  }

  get title (): string | undefined {
    return this.props.title?.value
  }

  get bio (): string | undefined {
    return this.props.bio?.value
  }

  static register (data: RegisterUserData): RegisterUserResponse {
    const { dateOfBirth, pronoun, username, name, title, bio, socialMedias, rpgStyles } = data

    const nameOrError = Name.create(name)
    const usernameOrError = Username.create(username)
    const pronounOrError = Pronoun.create(pronoun)
    const dateOfBirthOrError = DateOfBirth.create(dateOfBirth)
    const rpgStyleOrError = rpgStyles.map((rpgStyle) => RpgStyle.create(rpgStyle))
    const socialMediasOrError = socialMedias ? socialMedias.map(socialMedia => SocialMedia.create(socialMedia)) : []

    const results = [usernameOrError, pronounOrError, dateOfBirthOrError, nameOrError, ...socialMediasOrError, ...rpgStyleOrError]

    const titleOrError = title ? Title.create(title) : undefined
    titleOrError && results.push(titleOrError)

    const bioOrError = bio ? Bio.create(bio) : undefined
    bioOrError && results.push(bioOrError)

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
          rpgStyles: rpgStyleOrError.map((rpgStyle) => rpgStyle.value) as RpgStyle[],
          socialMedias: (socialMediasOrError).map(socialMedia => socialMedia.value) as SocialMedia[],
          title: titleOrError?.value as Title,
          bio: bioOrError?.value as Bio
        },
        new UniqueEntityId(data.id)
      )
    )
  }
}
