import type { UpdateUserData, UpdateUser } from '@/domain/contracts/user'
import { formatDateStringToDateTime } from '@/util'

export class UpdateUserUseCase implements UpdateUser {
  async perform (data: UpdateUserData): Promise<void> {
    if (data.dateOfBirth) {
      formatDateStringToDateTime(data.dateOfBirth)
    }
  }
}
