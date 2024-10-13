import { Test, type TestingModule } from '@nestjs/testing'
import { type SocialMediaModel } from './repository/entities/social-media.model'
import { SocialMediaRepository } from './repository/social-media-repository'
import { SocialMediaService } from './social-media.service'

export class MockSocialMediaRepository {
  async findAll (): Promise<SocialMediaModel[]> {
    return [
      { id: 'fake-id-1', name: 'Social Media 1', baseUri: 'base-url-social-media-1' },
      { id: 'fake-id-2', name: 'Social Media 2', baseUri: 'base-url-social-media-2' },
      { id: 'fake-id-3', name: 'Social Media 3', baseUri: 'base-url-social-media-3' }
    ]
  }

  async findById (id: string): Promise<SocialMediaModel | undefined> {
    return { id: 'fake-id-1', name: 'Social Media 1', baseUri: 'base-url-social-media-1' }
  }
}

describe('SocialMediaService', () => {
  let service: SocialMediaService
  let repository: SocialMediaRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialMediaService,
        {
          provide: SocialMediaRepository,
          useClass: MockSocialMediaRepository

        }

      ]
    }).compile()

    service = module.get<SocialMediaService>(SocialMediaService)
    repository = module.get<SocialMediaRepository>(SocialMediaRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('Test Find all Social Medi', () => {
    it('should return a empty list', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValueOnce([])
      const result = await service.findAll()
      expect(result.length).toBe(0)
    })

    it('should return a list with values', async () => {
      const result = await service.findAll()
      expect(result.length).toBe(3)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'Social Media 1', baseUri: 'base-url-social-media-1' }),
        expect.objectContaining({ name: 'Social Media 2', baseUri: 'base-url-social-media-2' }),
        expect.objectContaining({ name: 'Social Media 3', baseUri: 'base-url-social-media-3' })
      ]))
    })
  })
})
