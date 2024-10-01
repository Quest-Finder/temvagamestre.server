import { type SocialMediaModel } from '@/social-media/repository/entities/social-media.model'
import { SocialMediaRepository } from '@/social-media/repository/social-media-repository'
import { type UserSocialMediaModel } from '@/users/repository/entity/user-social-media.model'
import { type CreateUserSocialMedia, UserSocialMediaRepository } from '@/users/repository/user-social-media/user-social-media-repository'
import { UserRepository } from '@/users/repository/user/user-repository'
import { Test, type TestingModule } from '@nestjs/testing'
import { type SaveUserSocialMediaInputService, UserSocialMediaService } from './user-social-media.service'

class FakeUserSocialMediaRepository {
  async save (data: CreateUserSocialMedia): Promise<UserSocialMediaModel | undefined> {
    return await Promise.resolve({
      link: 'valid link',
      socialMediaId: 'id-social-media',
      userId: 'id-user'
    })
  }
}
class FakeSocialMediaRepository {
  async findById (id: string): Promise<SocialMediaModel | undefined> {
    return await Promise.resolve({
      id: 'valid-id',
      name: 'valid name',
      baseUri: 'https://valid-url.com'
    })
  }
}
class FakeUserRepository {
  async findById (id: string): Promise<SocialMediaModel | undefined> {
    return await Promise.resolve({
      id: 'valid-id',
      name: 'valid name',
      baseUri: 'https://valid-url.com'
    })
  }
}

describe('UserSocialMediaService', () => {
  let service: UserSocialMediaService
  let socialMediaRepository: SocialMediaRepository
  let userRepository: UserRepository
  let userSocialMediaRepository: UserSocialMediaRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSocialMediaService,
        {
          provide: SocialMediaRepository,
          useClass: FakeSocialMediaRepository
        },
        {
          provide: UserRepository,
          useClass: FakeUserRepository
        },
        {
          provide: UserSocialMediaRepository,
          useClass: FakeUserSocialMediaRepository
        }
      ]
    }).compile()
    service = module.get<UserSocialMediaService>(UserSocialMediaService)
    socialMediaRepository = module.get<SocialMediaRepository>(SocialMediaRepository)
    userRepository = module.get<UserRepository>(UserRepository)
    userSocialMediaRepository = module.get<UserSocialMediaRepository>(UserSocialMediaRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Save a Social Media', () => {
    it('should return a error if social media not exits ', async () => {
      const fakeInput: SaveUserSocialMediaInputService = {
        link: '/some-link',
        socialMediaId: 'valid-social-media',
        userId: 'valid-id'
      }
      jest.spyOn(socialMediaRepository, 'findById').mockResolvedValue(undefined)
      const result = service.save(fakeInput)
      await expect(result).rejects.toEqual(new Error('Social Media not found'))
    })
    it('should return a error if user not exits ', async () => {
      const fakeInput: SaveUserSocialMediaInputService = {
        link: '/some-link',
        socialMediaId: 'valid-social-media',
        userId: 'invalid-user-id'
      }
      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(undefined)
      const result = service.save(fakeInput)
      await expect(result).rejects.toEqual(new Error('User not found'))
    })
    it('should return a userSocialMedia if create success', async () => {
      const userSocialMediaRepositorySpy = jest.spyOn(userSocialMediaRepository, 'save')
      const result = await service.save({
        link: '/some-link',
        socialMediaId: 'valid-social-media',
        userId: 'valid-user-id'
      })
      expect(userSocialMediaRepositorySpy).toHaveBeenCalledTimes(1)
      expect(result).toEqual(expect.objectContaining({
        link: 'valid link',
        socialMediaId: 'id-social-media',
        userId: 'id-user'
      }))
    })
  })
})
