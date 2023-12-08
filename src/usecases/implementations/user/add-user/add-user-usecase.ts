import type { AddUserData, AddUserResponse, AddUser } from '@/domain/contracts/user'
import type { FindUserByEmailRepo } from '@/usecases/contracts/db/user'

export class AddUserUseCase implements AddUser {
  constructor (private readonly findUserByEmailRepo: FindUserByEmailRepo) {}

  async perform (data: AddUserData): Promise<AddUserResponse> {
    await this.findUserByEmailRepo.execute(data.email)
    return '' as any
  }
}
