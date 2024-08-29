import { Test, type TestingModule } from '@nestjs/testing'
import { SignUpController } from './sign-up.controller'
import { SignUpService } from './sign-up.service'

describe('SignUpController', () => {
  let controller: SignUpController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [SignUpService]
    }).compile()

    controller = module.get<SignUpController>(SignUpController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
