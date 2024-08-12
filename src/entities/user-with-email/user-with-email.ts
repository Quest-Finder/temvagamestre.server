import { Entity, UniqueEntityId } from '@/shared'
import { Email } from './value-objects/email/email'
import { Password } from './value-objects/password/password'
import { type EmailSignUpUserResponse, type EmailSignUpUserData } from './user-with-email-types'
import { left, right } from '@/shared/either'

export type UserWithEmailProps = {
  email: Email
  password: Password
}

export class UserWithEmail extends Entity<UserWithEmailProps> {
  private constructor (props: UserWithEmailProps, id?: UniqueEntityId) {
    super(props, id)
    Object.freeze(this)
  }

  get email (): string {
    return this.props.email.value
  }

  static register (data: EmailSignUpUserData): EmailSignUpUserResponse {
    const { email, password } = data

    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)

    const results = [emailOrError, passwordOrError]

    for (const result of results) {
      if (result.isLeft()) return left(result.value)
    }

    return right(
      new UserWithEmail(
        {
          email: emailOrError.value as Email,
          password: passwordOrError.value as Password
        },
        new UniqueEntityId(data.id)
      )
    )
  }
}
