import { type UserModel } from '@/domain/models'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'

export class FindUserByIdPrismaRepo implements FindUserByIdRepo {
  async execute (userId: string): Promise<UserModel | null> {
    return null
  }
}
