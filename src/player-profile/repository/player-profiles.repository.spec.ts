import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { PlayersProfileRepository } from './player-profiles.repository'

describe('RpgStylesRepository', () => {
  let service: PlayersProfileRepository
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersProfileRepository, PrismaService]
    }).compile()

    service = module.get<PlayersProfileRepository>(PlayersProfileRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  beforeEach(async () => {
    await prismaService.playerProfile.deleteMany()
  })

  afterAll(async () => {
    await prismaService.playerProfile.deleteMany()
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Find All PlayersProfile', () => {
    it('should return a empty list when not styles exists', async () => {
      const result = await service.findAll()
      expect(result.length).toBe(0)
    })

    it('should return a list with rpg styles', async () => {
      await prismaService.playerProfile.createMany({
        data: [
          { id: 'id-1', name: 'Player-Profile 1', description: 'Some description' },
          { id: 'id-2', name: 'Player-Profile 2', description: 'Some description 2' }
        ]
      })
      const result = await service.findAll()
      expect(result.length).toBe(2)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'Player-Profile 1' }),
        expect.objectContaining({ name: 'Player-Profile 2' })
      ]))
    })
  })
})
