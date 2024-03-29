import { type FindUserById, type FindUserByIdData, type FindUserByIdResponse } from '@/domain/contracts/user'
import { right } from '@/shared/either'

export class FindUserByIdUseCase implements FindUserById {
  async perform (data: FindUserByIdData): Promise<FindUserByIdResponse> {
    return right({
      id: 'string',
      firstName: 'string',
      lastName: 'string',
      email: 'string'
    })
  }
}
