import { Entity, type UniqueEntityId } from '@/shared'

export type UserWithEmailProps = {
  email: Email
  password: Password
}

export class UserWithEmail extends Entity<UserWithEmailProps> {
  private constructor (props: UserWithEmailProps, id?: UniqueEntityId) {
    super(props, id)
    Object.freeze(this)
  }

  get email (): Email {
    return this.props.email.value
  }

  get password (): Password {
    return this.props.password.value
  }

  // static register (data: RegisterUserWithEmail): RegisterUserWithEmail {

  // }
}
