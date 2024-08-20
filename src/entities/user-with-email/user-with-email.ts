import { Entity, type UniqueEntityId } from '@/shared'
import { Email, Password } from './value-objects'
import { type SignUpWithEmailResponse, type SignUpWithEmailData } from './user-with-email-types'
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

  static register (data: SignUpWithEmailData): SignUpWithEmailResponse {
    const emailOrError = Email.create(data.email)
    if (emailOrError.isLeft()) return left(emailOrError.value)

    const passwordOrError = Password.create(data.password)
    if (passwordOrError.isLeft()) return left(passwordOrError.value)

    const email = emailOrError.value
    const password = passwordOrError.value

    return right(
      new UserWithEmail({
        email,
        password
      })
    )
  }
}
