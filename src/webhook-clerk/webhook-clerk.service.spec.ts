import { type UserModel } from '@/users/repository/entity/user.model'
import { UserRepository, type UserInputRepository } from '@/users/repository/user/user-repository'
import { Test, type TestingModule } from '@nestjs/testing'
import { WebhookClerkService, type WebhookUserInput } from './webhook-clerk.service'

class MockUserRepository {
  async createUser (data: UserInputRepository): Promise<UserModel> {
    return {
      id: 'valid-id',
      ...data
    }
  }

  async findByEmail (email: string): Promise<UserModel> {
    return {
      id: 'valid-id',
      name: 'John Doe',
      email: 'validemail@email.com',
      externalAuthUserId: 'valid-external-id'

    }
  }

  async findByExternalAuthId (externalAuthId: string): Promise<UserModel> {
    return {
      id: 'valid-id',
      name: 'John Doe',
      email: 'validemail@email.com',
      externalAuthUserId: 'valid-external-id'

    }
  }
}

const mockUserInput = (): WebhookUserInput => ({
  name: 'John Doe',
  email: 'validemail@email.com',
  externalAuthUserId: 'valid-external-id'
})

describe('WebhookClerkService', () => {
  let service: WebhookClerkService
  let userRepository: UserRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookClerkService,
        {
          provide: UserRepository,
          useClass: MockUserRepository
        }
      ]

    }).compile()

    service = module.get<WebhookClerkService>(WebhookClerkService)
    userRepository = module.get<UserRepository>(UserRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Create User', () => {
    it('should return a error if user already exists', async () => {
      try {
        await service.create(mockUserInput())
      } catch (error: any) {
        expect(error.message).toEqual('Email already exists')
      }
    })
    it('should return a error if external auth id already exists', async () => {
      try {
        jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(undefined)
        await service.create(mockUserInput())
      } catch (error: any) {
        expect(error.message).toEqual('External Auth Id already exists')
      }
    })
    it('should return a void success', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(undefined)
      jest.spyOn(userRepository, 'findByExternalAuthId').mockResolvedValueOnce(undefined)
      const userRepositorySpy = jest.spyOn(userRepository, 'createUser')
      await service.create(mockUserInput())
      expect(userRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })
})
