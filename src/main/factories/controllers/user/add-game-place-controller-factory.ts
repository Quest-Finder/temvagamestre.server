import { AddGamePlaceController } from '@/presentation/controllers/user/add-game-place/add-game-place-controller'
import { AddGamePlaceZodValidation } from '@/validators/user/add-game-place/add-game-place-zod-validation'
import { type Controller } from '@nestjs/common/interfaces'
import { makeAddGamePlaceUsecase } from '../../usecases/user/add-game-place-usecase-factory'

export const makeAddGamePlaceController = (): Controller => {
  const validation = new AddGamePlaceZodValidation()
  return new AddGamePlaceController(
    validation,
    makeAddGamePlaceUsecase()
  )
}
