import type { UpdateUser, UpdateUserData, UpdateUserResponse } from '@/domain/contracts/user'
import { type UpdateUserEntityData, User } from '@/domain/entities/user'
import { left, right } from '@/shared/either'
import type { UpdateUserRepo, UpdateUserRepoData } from '@/usecases/contracts/db/user'
import { formatDateStringToDateTime } from '@/util'

export class UpdateUserUseCase implements UpdateUser {
  constructor (private readonly updateUserRepo: UpdateUserRepo) {}

  async perform (data: UpdateUserData): Promise<UpdateUserResponse> {
    const dataToUserEntity: UpdateUserEntityData = !data.nickname
      ? Object.fromEntries(Object.entries(data).map(([key, value]) => (value ? [key, value] : [])))
      : (({ id, nickname, ...allDatas }) => allDatas)(data)
    const userResult = User.update(dataToUserEntity)
    if (userResult.isLeft()) {
      return left(userResult.value)
    }
    const dateOfBirth = userResult.value.dateOfBirth
      ? formatDateStringToDateTime(userResult.value.dateOfBirth)
      : undefined
    const dataRepo: UpdateUserRepoData = {
      id: data.id,
      ...(data.nickname && { nickname: data.nickname }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(Object.keys(data).filter(key => ['firstName', 'lastName', 'phone'].includes(key))
        .reduce((acc, key) => ({ ...acc, [key]: userResult.value[key] }), {}))
    }
    await this.updateUserRepo.execute(dataRepo)
    return right(null)
  }
}
