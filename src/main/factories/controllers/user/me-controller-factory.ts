import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeFindUserByIdUseCase } from '@/main/factories/usecases/user/find-user-by-id-usecase-factory'
import { type Controller } from '@/presentation/contracts'
import { MeController } from '@/presentation/controllers/user/me/me-controller'

export const makeMeController = (): Controller => {
  const controller = new MeController(makeFindUserByIdUseCase())
  return makeLogControllerDecorator(controller)
}
