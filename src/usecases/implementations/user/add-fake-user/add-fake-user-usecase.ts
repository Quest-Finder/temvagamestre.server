import type { AddFakeUser, AddUser } from '@/domain/contracts/user'
import { type Encrypter } from '@/usecases/contracts/cryptography/encrypter'
import { type IdBuilder } from '@/usecases/contracts/id'

export class AddFakeUserUseCase implements AddFakeUser {
  constructor (
    private readonly idBuilder: IdBuilder,
    private readonly addUser: AddUser,
    private readonly encrypter: Encrypter
  ) {}

  async perform (): Promise<{ token: string }> {
    const id = this.idBuilder.build()
    const value = Math.random().toString().substring(2, 6)
    await this.addUser.perform({
      externalAuthUserId: id,
      email: `email_${value}@mail.com`,
      name: `last_name_${value} first_name_${value}`
    })
    return this.encrypter.execute(id)
  }
}
