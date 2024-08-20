import type { UserWithEmail } from '@/entities/user-with-email/user-with-email'
import type { EmailInUseError } from '@/errors'
import type { Either } from '@/shared/either'

export type SignUpWithEmailData = {
  email: string
  password: string
}

export type SignUpWithEmailResponse = Either<EmailInUseError, UserWithEmail>

export interface SignUpWithEmail {
  perform: (data: SignUpWithEmailData) => Promise<SignUpWithEmailResponse>
}
