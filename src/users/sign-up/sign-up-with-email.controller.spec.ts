import { Test, type TestingModule } from '@nestjs/testing'
import { SignUpController } from './sign-up-with-email.controller'
import { SignUpService } from './sign-up-with-email.service'
import { SharedModule } from '@/shared/shared.module'

describe('SignUpController', () => {
  let controller: SignUpController
  let service: SignUpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [SignUpService],
      imports: [SharedModule]
    }).compile()

    controller = module.get<SignUpController>(SignUpController)
    service = module.get<SignUpService>(SignUpService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('/POST /user/signup/email', async () => {
    const signUpWithEmailDto = {
      email: 'test@example.com',
      password: 'test123'
    }

    const token = 'some-token'

    jest.spyOn(service, 'create').mockResolvedValueOnce({ token })

    const result = await controller.create(signUpWithEmailDto)
    expect(result).toBeInstanceOf(Promise)

    await expect(result).resolves.toEqual({ token })
  })
})
