import type { AddFakeUser, AddFakeUserResponse, AddUser } from '@/domain/contracts/user'
import { type IdBuilder } from '@/usecases/contracts/id'

export class AddFakeUserUseCase implements AddFakeUser {
  constructor (
    private readonly idBuilder: IdBuilder,
    private readonly addUser: AddUser
  ) {}

  async perform (): Promise<AddFakeUserResponse> {
    const id = this.idBuilder.build()
    const value = Math.random().toString().substring(2, 8)
    await this.addUser.perform({
      externalAuthUserId: id,
      email: `email_${value}@mail.com`,
      lastName: `last_name_${value}`,
      firstName: `first_name_${value}`
    })
    return { token: '' }
  }
}
