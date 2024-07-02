import { type Controller } from '@/contracts'
import { AdaptClerkRequestSignUpControllerDecorator } from '@/decorators'

export const makeAdaptClerkRequestSignUpControllerDecorator = (controller: Controller): Controller => {
  return new AdaptClerkRequestSignUpControllerDecorator(controller)
}
