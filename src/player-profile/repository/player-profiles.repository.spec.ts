import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { PlayersProfileRepository } from './player-profiles.repository'

describe('RpgStylesRepository', () => {
  let repository: PlayersProfileRepository
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersProfileRepository, PrismaService]
    }).compile()

    repository = module.get<PlayersProfileRepository>(PlayersProfileRepository)
    prismaService = module.get<PrismaService>(PrismaService)
    await prismaService.playerProfile.deleteMany()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('Find All PlayersProfile', () => {
    it('should return a empty list when not styles exists', async () => {
      const result = await repository.findAll()
      expect(result.length).toBe(0)
    })

    it('should return a list with rpg styles', async () => {
      await prismaService.playerProfile.createMany({
        data: [
          { id: 'id-1', name: 'Player-Profile 1', description: 'Some description' },
          { id: 'id-2', name: 'Player-Profile 2', description: 'Some description 2' }
        ]
      })
      const result = await repository.findAll()
      expect(result.length).toBe(2)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'Player-Profile 1' }),
        expect.objectContaining({ name: 'Player-Profile 2' })
      ]))
    })
  })

  describe('Find Player Profile By Id', () => {
    it('should return undefined if player profile id not exists', async () => {
      const data = await repository.findById('invalid-id')
      expect(data).not.toBeTruthy()
    })
    it('should return player profile if player profile id exits', async () => {
      await prismaService.playerProfile.createMany({
        data: [
          { id: 'id-1', name: 'Player-Profile 1', description: 'Some description' }
        ]
      })
      const data = await repository.findById('id-1')
      expect(data).toEqual(expect.objectContaining({ id: 'id-1', name: 'Player-Profile 1', description: 'Some description' }))
    })
  })
})
