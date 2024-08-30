import { Test, type TestingModule } from '@nestjs/testing'
import { SignUpService } from './sign-up.service'
import { SharedModule } from '@/shared/shared.module'

describe('SignUpService', () => {
  let service: SignUpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpService],
      imports: [SharedModule]
    }).compile()

    service = module.get<SignUpService>(SignUpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
