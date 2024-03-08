import type { UpdateUser, UpdateUserData, UpdateUserResponse } from '@/domain/contracts/user'
import { type UpdateUserEntityData, User } from '@/domain/entities/user'
import { left, right } from '@/shared/either'
import type { UpdateUserRepo, UpdateUserRepoData } from '@/usecases/contracts/db/user'
import { formatDateStringToDateTime } from '@/util'

const userDataKeys = ['firstName', 'lastName', 'phone']

export class UpdateUserUseCase implements UpdateUser {
  constructor (private readonly updateUserRepo: UpdateUserRepo) {}

  async perform (data: UpdateUserData): Promise<UpdateUserResponse> {
    const { id, ...updatedData } = data
    const dataToUserEntity: UpdateUserEntityData = !updatedData.nickname
      ? Object.fromEntries(Object.entries(updatedData))
      : (({ nickname, ...allDatas }) => allDatas)(updatedData)
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
      ...userDataKeys.reduce((acc, key) => (
        updatedData[key] ? { ...acc, [key]: updatedData[key] } : acc
      ), {})
    }
    await this.updateUserRepo.execute(dataRepo)
    return right()
  }
}
