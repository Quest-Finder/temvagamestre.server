import { Test, type TestingModule } from '@nestjs/testing'
import { PlayerProfileService } from './player-profile.service'
import { type PlayerProfileModel } from './repository/model/player-profile.model'
import { PlayersProfileRepository } from './repository/player-profiles.repository'

export class MockPlayerProfileRepository {
  async findAll (): Promise<PlayerProfileModel[]> {
    return await Promise.resolve([
      { id: 'id-1', name: 'Player-Profile 1', description: 'Some description' },
      { id: 'id-2', name: 'Player-Profile 2', description: 'Some description 2' }
    ])
  }

  async findById (id: string): Promise<PlayerProfileModel | undefined> {
    return { id: 'id-1', name: 'Player-Profile 1', description: 'Some description' }
  }
}

describe('PlayerProfileService', () => {
  let service: PlayerProfileService
  let repository: PlayersProfileRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerProfileService,
        {
          provide: PlayersProfileRepository,
          useClass: MockPlayerProfileRepository
        }

      ]
    }).compile()

    service = module.get<PlayerProfileService>(PlayerProfileService)
    repository = module.get<PlayersProfileRepository>(PlayersProfileRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Find All players profile', () => {
    it('should return a empty list if result not exits', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValueOnce([])
      const result = await service.findAll()
      expect(result.length).toBe(0)
    })

    it('should return a empty with values', async () => {
      const result = await service.findAll()
      expect(result.length).toBe(2)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'Player-Profile 1' }),
        expect.objectContaining({ name: 'Player-Profile 2' })
      ]))
    })
  })
})
