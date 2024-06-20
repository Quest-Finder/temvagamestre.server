import type { AddUser, AddUserData, AddUserResponse } from '@/contracts/user'
import { EmailInUseError } from '@/errors'
import { left, right } from '@/shared/either'
import type { AddExternalAuthMappingRepo } from '@/usecases/contracts/db/external-auth-mapping'
import type { AddUserRepo, FindUserByEmailRepo } from '@/usecases/contracts/db/user'
import type { IdBuilder } from '@/usecases/contracts/id'

export class AddUserUseCase implements AddUser {
  constructor (
    private readonly findUserByEmailRepo: FindUserByEmailRepo,
    private readonly idBuilder: IdBuilder,
    private readonly addUserRepo: AddUserRepo,
    private readonly addExternalAuthMappingRepo: AddExternalAuthMappingRepo
  ) {}

  async perform (data: AddUserData): Promise<AddUserResponse> {
    const userOrNull = await this.findUserByEmailRepo.execute(data.email)
    if (userOrNull) {
      return left(new EmailInUseError(data.email))
    }
    const id = this.idBuilder.build()
    const { externalAuthUserId, ...userData } = data
    await this.addUserRepo.execute({ id, ...userData })
    await this.addExternalAuthMappingRepo.execute({ userId: id, externalAuthUserId })
    return right()
  }
}
