import type { UpdateUserConfigs, UpdateUserConfigsData, UpdateUserConfigsResponse } from '@/domain/contracts/user'
import { PhoneNotCreatedError } from '@/domain/errors'
import { type UserModel } from '@/domain/models'
import { left, right } from '@/shared/either'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'
import { type AddOrUpdateUserConfigsRepo } from '@/usecases/contracts/db/user-configs'

export class UpdateUserConfigsUseCase implements UpdateUserConfigs {
  constructor (
    private readonly findUserByIdRepo: FindUserByIdRepo,
    private readonly addOrUpdateUserConfigsRepo: AddOrUpdateUserConfigsRepo
  ) {}

  async perform (data: UpdateUserConfigsData): Promise<UpdateUserConfigsResponse> {
    const { userId: id, allowMessage } = data
    const user = await this.findUserByIdRepo.execute(id) as UserModel
    if (!user.phone) {
      return left(new PhoneNotCreatedError())
    }
    await this.addOrUpdateUserConfigsRepo.execute({ id, allowMessage })
    return right(null)
  }
}
