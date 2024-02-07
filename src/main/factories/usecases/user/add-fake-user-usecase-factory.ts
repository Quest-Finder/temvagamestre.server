import { type AddFakeUser } from '@/domain/contracts/user'
import { AddFakeUserUseCase } from '@/usecases/implementations/user/add-fake-user/add-fake-user-usecase'
import { makeJwtSignAdapter } from '../../infra/cryptography/jwt-sign-adapter-factory'
import { makeUuidAdapter } from '../../infra/id/uuid-adapter-factory'
import { makeAddUserUseCase } from './add-user-usecase-factory'

export const makeAddFakeUserUseCase = (): AddFakeUser => {
  return new AddFakeUserUseCase(
    makeUuidAdapter(),
    makeAddUserUseCase(),
    makeJwtSignAdapter()
  )
}
