import { type Controller } from '@/contracts'
import { AdaptSignUpWithEmailControllerDecorator } from '@/decorators'

export const makeAdaptSignUpWithEmailControllerDecorator = (controller: Controller): Controller => {
  return new AdaptSignUpWithEmailControllerDecorator(controller)
}
