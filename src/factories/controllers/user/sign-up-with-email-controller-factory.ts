import type { Controller } from '@/contracts'
import { SignUpWithEmailController } from '@/controllers/user/sign-up-with-email/sign-up-with-email-controller'
import { makeLogControllerDecorator } from '@/factories/decorators'
import { makeAddUserWithEmailUseCase } from '@/factories/usecases/user/add-user-with-email-usecase-factory'
import { SignUpWithEmailZodValidation } from '@/validators/user/sign-up-with-email/sign-up-with-email-zod-validation'
import { FindUserSignUpEmailRepo } from '../../../usecases/contracts/db/user/find-user-sign-up-email-repo'

export const makeSignUpWithEmailController = (): Controller => {
  const validation = new SignUpWithEmailZodValidation()
  const controller = new SignUpWithEmailController(
    validation,
    makeAddUserWithEmailUseCase(),
    FindUserSignUpEmailRepo()
  )
  return makeLogControllerDecorator(controller)
}
