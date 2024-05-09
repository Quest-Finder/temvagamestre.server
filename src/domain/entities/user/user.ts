import { Entity, UniqueEntityId } from '@/shared/domain'
import { left, right } from '@/shared/either'
import type { RegisterUserData, RegisterUserResponse } from './user-types'
import { Bio, DateOfBirth, Name, PlayerProfileId, Pronoun, RpgStyle, SocialMedia, Title, Username, type PronounEnum, type SocialMediaProps } from './value-objects'
import { CityState, type CityStateProps } from './value-objects/city-state/city-state'


export type UserProps = {
  name: Name
  username: Username
  pronoun: Pronoun
  dateOfBirth: DateOfBirth
  playerProfileId: PlayerProfileId
  rpgStyles: RpgStyle[]
  socialMedias?: SocialMedia[]
  title?: Title
  bio?: Bio
  cityState: CityState
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

  get playerProfile (): string {
    return this.props.playerProfileId.value
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

  get cityState (): CityStateProps {
    return this.props.cityState.value
  }

  static register (data: RegisterUserData): RegisterUserResponse {
    const { dateOfBirth, pronoun, username, name, title, bio, socialMedias, rpgStyles, playerProfileId, cityState } = data


    const nameOrError = Name.create(name)
    const usernameOrError = Username.create(username)
    const pronounOrError = Pronoun.create(pronoun)
    const dateOfBirthOrError = DateOfBirth.create(dateOfBirth)
    const playerProfileIdOrError = PlayerProfileId.create(playerProfileId)
    const rpgStyleOrError = rpgStyles.map((rpgStyle) => RpgStyle.create(rpgStyle))
    const socialMediasOrError = socialMedias ? socialMedias.map(socialMedia => SocialMedia.create(socialMedia)) : []
    const cityStateOrError = CityState.create(cityState)


    const results = [usernameOrError, pronounOrError, dateOfBirthOrError, nameOrError, ...socialMediasOrError, ...rpgStyleOrError, playerProfileIdOrError, cityStateOrError]


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
          playerProfileId: playerProfileIdOrError.value as PlayerProfileId,
          rpgStyles: rpgStyleOrError.map((rpgStyle) => rpgStyle.value) as RpgStyle[],
          socialMedias: (socialMediasOrError).map(socialMedia => socialMedia.value) as SocialMedia[],
          title: titleOrError?.value as Title,
          bio: bioOrError?.value as Bio,
          cityState: cityStateOrError.value as CityState
        },
        new UniqueEntityId(data.id)
      )
    )
  }
}
