import { makeAddUserUseCase } from '@/main/factories/usecases/user/add-user-usecase-factory'
import { SignUpController } from '@/presentation/controllers/user/signup/signup-controller'
import { SignUpZodValidation } from '@/validators/user/signup/signup-zod-validation'
import { type Controller } from '@nestjs/common/interfaces'

export const makeSignUpController = (): Controller => {
  const validation = new SignUpZodValidation()
  return new SignUpController(validation, makeAddUserUseCase())
}
