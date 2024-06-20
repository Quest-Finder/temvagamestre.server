import { type Controller } from '@/contracts'
import { FindManyRpgStylesController } from '@/controllers/rpg-style/find-many-rpg-styles/find-many-rpg-styles-controller'
import { makeFindManyRpgStylesUsecase } from '../../usecases/rpg-style/find-many-rpg-styles-usecase-factory'
import { makeLogControllerDecorator } from '../../decorators'

export const makeFindManyRpgStylesController = (): Controller => {
  const controller = new FindManyRpgStylesController(makeFindManyRpgStylesUsecase())
  return makeLogControllerDecorator(controller)
}
