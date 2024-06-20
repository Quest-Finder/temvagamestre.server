import { type Controller } from '@/contracts/controller'
import { AddFakeUserController } from '@/controllers/user/add-fake-user/signup-controller'
import { makeLogControllerDecorator } from '../../decorators'
import { makeAddFakeUserUseCase } from '../../usecases/user/add-fake-user-usecase-factory'

export const makeAddFakeUserController = (): Controller => {
  const controller = new AddFakeUserController(makeAddFakeUserUseCase())
  return makeLogControllerDecorator(controller)
}
