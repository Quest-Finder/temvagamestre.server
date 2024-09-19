import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { type SocialMediaModel } from './entities/social-media.model'
import { SocialMediaRepository } from './social-media-repository'

const makeFakeSocialMediaData = (): SocialMediaModel[] => {
  return [
    { id: 'fake-id-1', name: 'Social Media 1', baseUri: 'base-url-social-media-1' },
    { id: 'fake-id-2', name: 'Social Media 2', baseUri: 'base-url-social-media-2' },
    { id: 'fake-id-3', name: 'Social Media 3', baseUri: 'base-url-social-media-3' }
  ]
}

describe('SocialMediaRepository', () => {
  let repository: SocialMediaRepository
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialMediaRepository, PrismaService]
    }).compile()

    repository = module.get<SocialMediaRepository>(SocialMediaRepository)
    prismaService = module.get<PrismaService>(PrismaService)
    await prismaService.socialMedia.deleteMany()
  })

  afterAll(async () => {
    await prismaService.socialMedia.deleteMany()
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(prismaService).toBeDefined()
    expect(repository).toBeDefined()
  })

  it('should be return a empty list with social medias', async () => {
    const result = await repository.findAll()
    expect(result.length).toBe(0)
  })

  it('should be return a list with social medias', async () => {
    await prismaService.socialMedia.createMany({
      data: makeFakeSocialMediaData()
    })
    const result = await repository.findAll()
    expect(result.length).toBe(3)
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Social Media 1', baseUri: 'base-url-social-media-1' }),
      expect.objectContaining({ name: 'Social Media 2', baseUri: 'base-url-social-media-2' }),
      expect.objectContaining({ name: 'Social Media 3', baseUri: 'base-url-social-media-3' })
    ]))
  })
})
