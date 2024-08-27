import type { UserWithEmailModel } from '@/models/user-with-email-model'

export interface FindUserSignUpEmailRepo {
  execute: (email: string) => Promise<null | UserWithEmailModel>
}
