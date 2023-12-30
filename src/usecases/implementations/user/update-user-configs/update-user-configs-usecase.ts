import type { UpdateUserConfigs, UpdateUserConfigsData, UpdateUserConfigsResponse } from '@/domain/contracts/user'
import { right } from '@/shared/either'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'

export class UpdateUserConfigsUseCase implements UpdateUserConfigs {
  constructor (private readonly findUserByIdRepo: FindUserByIdRepo) {}

  async perform (data: UpdateUserConfigsData): Promise<UpdateUserConfigsResponse> {
    await this.findUserByIdRepo.execute(data.userId)
    return right(null)
  }
}
