import { UserWithEmail } from '@/entities/user-with-email/user-with-email'
import type { SignUpWithEmailData, SignUpWithEmailResponse } from '@/entities/user-with-email/user-with-email-types'
import { EmailInUseError } from '@/errors'
import { left, right } from '@/shared/either'
import { FindUserByEmailRepo } from '@/usecases/contracts/db/user'
import { SaveWithEmailRepo } from '@/usecases/contracts/db/user/save-with-email-repo'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SignUpWithEmailUseCase {
  constructor (
    private readonly findUserByEmailRepo: FindUserByEmailRepo,
    private readonly saveWithEmailRepo: SaveWithEmailRepo
  ) { }

  async perform (data: SignUpWithEmailData): Promise<SignUpWithEmailResponse> {
    const userOrNull = await this.findUserByEmailRepo.execute(data.email)
    if (userOrNull) {
      return left(new EmailInUseError(data.email))
    }
    const signUpWithEmailResult = UserWithEmail.register(data)
    if (signUpWithEmailResult.isLeft()) {
      return left(signUpWithEmailResult.value)
    }

    await this.saveWithEmailRepo.execute(data)

    return right(signUpWithEmailResult.value)
  }
}
