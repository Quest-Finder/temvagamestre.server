import { UserWithEmail } from '@/entities/user-with-email/user-with-email'
import { type SignUpWithEmailData, type SignUpWithEmailResponse } from '@/entities/user-with-email/user-with-email-types'
import { left, right } from '@/shared/either'
import { SignUpWithEmailRepo } from '@/usecases/contracts/db/user/sign-up-with-email-repo'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SignUpWithEmailUseCase {
  constructor (
    private readonly signUpWithEmailRepo: SignUpWithEmailRepo
  ) { }

  async perform (data: SignUpWithEmailData): Promise<SignUpWithEmailResponse> {
    const signUpWithEmailResult = UserWithEmail.register(data)
    if (signUpWithEmailResult.isLeft()) {
      return left(signUpWithEmailResult.value)
    }

    await this.signUpWithEmailRepo.execute(data)

    return right(signUpWithEmailResult.value)
  }
}
