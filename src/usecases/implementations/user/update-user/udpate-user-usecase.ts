import type { UpdateUserData, UpdateUser, UpdateUserResponse } from '@/domain/contracts/user'
import { User } from '@/domain/entities/user/user'
import { right } from '@/shared/either'
import type { UpdateUserRepoData, UpdateUserRepo } from '@/usecases/contracts/db/user'
import { formatDateStringToDateTime } from '@/util'

export class UpdateUserUseCase implements UpdateUser {
  constructor (private readonly updateUserRepo: UpdateUserRepo) {}

  async perform (data: UpdateUserData): Promise<UpdateUserResponse> {
    const { id, nickname, ...dataToUserEntity } = data
    User.update(dataToUserEntity)
    const { dateOfBirth, ...dataToRepo } = data
    const dataRepo: UpdateUserRepoData = dataToRepo
    if (dateOfBirth) {
      dataRepo.dateOfBirth = formatDateStringToDateTime(dateOfBirth)
    }
    await this.updateUserRepo.execute(dataRepo)
    return right(null)
  }
}
