import type { AddFakeUser, AddFakeUserResponse } from '@/domain/contracts/user'
import { type IdBuilder } from '@/usecases/contracts/id'

export class AddFakeUserUseCase implements AddFakeUser {
  constructor (private readonly idBuilder: IdBuilder) {}

  async perform (): Promise<AddFakeUserResponse> {
    this.idBuilder.build()
    return { token: '' }
  }
}
