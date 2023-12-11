import { type Controller } from '@/presentation/contracts'
import { AdaptClerkRequestSignUpControllerDecorator } from '@/presentation/decorators'

export const makeAdaptClerkRequestSignUpControllerDecorator = (controller: Controller): Controller => {
  return new AdaptClerkRequestSignUpControllerDecorator(controller)
}
