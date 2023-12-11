import { type Controller } from '@/presentation/contracts'
import { AdaptClerkRequestSignUpControllerDecorator } from '@/main/decorators'

export const makeAdaptClerkRequestSignUpControllerDecorator = (controller: Controller): Controller => {
  return new AdaptClerkRequestSignUpControllerDecorator(controller)
}
