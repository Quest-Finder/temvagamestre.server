import { type Controller } from '@/presentation/contracts'
import { FindManyRpgStylesController } from '@/presentation/controllers/rpg-style/find-many-rpg-styles/find-many-rpg-styles-controller'
import { makeFindManyRpgStylesUsecase } from '../../usecases/rpg-style/find-many-rpg-styles-usecase-factory'
import { makeLogControllerDecorator } from '../../decorators'

export const makeFindManyRpgStylesController = (): Controller => {
  const controller = new FindManyRpgStylesController(makeFindManyRpgStylesUsecase())
  return makeLogControllerDecorator(controller)
}
