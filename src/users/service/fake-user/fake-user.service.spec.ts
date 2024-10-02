import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { FakeUserService } from './fake-user.service'

describe('FakeUserService', () => {
  let service: FakeUserService
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeUserService, PrismaService]
    }).compile()

    service = module.get<FakeUserService>(FakeUserService)
    prismaService = module.get<PrismaService>(PrismaService)
    await prismaService.$connect()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.user.deleteMany()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Create a Fake User', () => {
    it('should ', async () => {
      const result = await service.createFakeUser()
      expect(result.token).toBeTruthy()
      expect(result.user).toBeTruthy()
    })
  })
})
