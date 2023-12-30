import type { UpdateUserConfigs, UpdateUserConfigsData, UpdateUserConfigsResponse } from '@/domain/contracts/user'
import { PhoneNotCreatedError } from '@/domain/errors'
import { type UserModel } from '@/domain/models'
import { left, right } from '@/shared/either'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'

export class UpdateUserConfigsUseCase implements UpdateUserConfigs {
  constructor (private readonly findUserByIdRepo: FindUserByIdRepo) {}

  async perform (data: UpdateUserConfigsData): Promise<UpdateUserConfigsResponse> {
    const user = await this.findUserByIdRepo.execute(data.userId) as UserModel
    if (!user.phone) {
      return left(new PhoneNotCreatedError())
    }
    return right(null)
  }
}
