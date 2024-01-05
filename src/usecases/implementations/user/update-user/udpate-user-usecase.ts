import type { UpdateUserData, UpdateUser } from '@/domain/contracts/user'
import type { UpdateUserRepoData, UpdateUserRepo } from '@/usecases/contracts/db/user'
import { formatDateStringToDateTime } from '@/util'

export class UpdateUserUseCase implements UpdateUser {
  constructor (private readonly updateUserRepo: UpdateUserRepo) {}

  async perform (data: UpdateUserData): Promise<void> {
    const { dateOfBirth, ...dataToRepo } = data
    const dataRepo: UpdateUserRepoData = dataToRepo
    if (dateOfBirth) {
      dataRepo.dateOfBirth = formatDateStringToDateTime(dateOfBirth)
    }
    await this.updateUserRepo.execute(dataRepo)
  }
}
