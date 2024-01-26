import { type Controller } from '@/presentation/contracts'
import { FindManyRpgStylesController } from '@/presentation/controllers/rpg-style/find-many-rpg-styles/find-many-rpg-styles-controller'
import { makeFindManyRpgStylesUsecase } from '../../usecases/rpg-style/find-many-rpg-styles-usecase-factory'

export const makeFindManyRpgStylesController = (): Controller => {
  return new FindManyRpgStylesController(makeFindManyRpgStylesUsecase())
}
