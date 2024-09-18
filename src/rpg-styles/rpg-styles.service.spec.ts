import { Test, type TestingModule } from '@nestjs/testing'
import { type RpgStyleModel } from './repository/entities/rpg-style.entity'
import { RpgStylesRepository } from './repository/rpg-styles.repository'
import { RpgStylesService } from './rpg-styles.service'

class MockRpgStyleRepository {
  async findAll (): Promise<RpgStyleModel[]> {
    return [
      { id: 'valid-id-1', name: 'Rpg Styles 1' },
      { id: 'valid-id-2', name: 'Rpg Styles 2' }
    ]
  }
}

describe('RpgStylesService', () => {
  let service: RpgStylesService
  let rpgStyleRepository: RpgStylesRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RpgStylesService,
        {
          provide: RpgStylesRepository,
          useClass: MockRpgStyleRepository
        }
      ]

    }).compile()

    service = module.get<RpgStylesService>(RpgStylesService)
    rpgStyleRepository = module.get<RpgStylesRepository>(RpgStylesRepository)
  })

  beforeAll(async () => {

  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Find all Rgp Styles', () => {
    it('should return a empty list when nothing is found', async () => {
      jest.spyOn(rpgStyleRepository, 'findAll').mockResolvedValueOnce([])
      const result = await service.findAll()
      expect(result.length).toBe(0)
    })

    it('should return a list with rgp styles data', async () => {
      const result = await service.findAll()
      expect(result.length).toBe(2)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: 'valid-id-1', name: 'Rpg Styles 1' }),
        expect.objectContaining({ id: 'valid-id-2', name: 'Rpg Styles 2' })
      ]))
    })

    it('should return throws if repository throws', async () => {
      jest.spyOn(rpgStyleRepository, 'findAll').mockRejectedValueOnce(new Error('Some error'))
      const result = service.findAll()
      await expect(result).rejects.toEqual(new Error('Some error'))
    })
  })
})
