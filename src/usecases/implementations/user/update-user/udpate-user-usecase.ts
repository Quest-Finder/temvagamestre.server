import type { UpdateUserData, UpdateUser } from '@/domain/contracts/user'
import { formatDateStringToDateTime } from '@/util'

export class UpdateUserUseCase implements UpdateUser {
  async perform (data: UpdateUserData): Promise<void> {
    formatDateStringToDateTime(data.dateOfBirth as string)
  }
}
