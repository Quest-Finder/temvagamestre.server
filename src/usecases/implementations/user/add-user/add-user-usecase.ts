import type { AddUserData, AddUserResponse, AddUser } from '@/domain/contracts/user'
import type { FindUserByEmailRepo } from '@/usecases/contracts/db/user'
import type { IdBuilder } from '@/usecases/contracts/id'
import { EmailInUseError } from '@/domain/errors'
import { left } from '@/shared/either'

export class AddUserUseCase implements AddUser {
  constructor (
    private readonly findUserByEmailRepo: FindUserByEmailRepo,
    private readonly idBuilder: IdBuilder
  ) {}

  async perform (data: AddUserData): Promise<AddUserResponse> {
    const userOrNull = await this.findUserByEmailRepo.execute(data.email)
    if (userOrNull) {
      return left(new EmailInUseError(data.email))
    }
    this.idBuilder.build()
    return '' as any
  }
}
