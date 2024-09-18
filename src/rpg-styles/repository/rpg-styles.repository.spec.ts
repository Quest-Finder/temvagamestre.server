import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { RpgStylesRepository } from './rpg-styles.repository'

describe('RpgStylesRepository', () => {
  let service: RpgStylesRepository
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpgStylesRepository, PrismaService]
    }).compile()

    service = module.get<RpgStylesRepository>(RpgStylesRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  beforeAll(async () => {

  })

  afterAll(async () => {
    await prismaService.rpgStyle.deleteMany()
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Find All RgpStyles', () => {
    it('should return a empty list when not styles exists', async () => {
      const result = await service.findAll()
      expect(result.length).toBe(0)
    })

    it('should return a list with rpg styles', async () => {
      await prismaService.rpgStyle.createMany({
        data: [
          { id: 'id-1', name: 'Rpg Style 1' },
          { id: 'id-2', name: 'Rpg Style 2' }
        ]
      })
      const result = await service.findAll()
      expect(result.length).toBe(2)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'Rpg Style 1' }),
        expect.objectContaining({ name: 'Rpg Style 2' })
      ]))
    })
  })
})
