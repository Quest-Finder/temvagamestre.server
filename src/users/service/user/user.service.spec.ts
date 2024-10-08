import { AppException } from '@/shared/exceptions/app-exception'
import { type UserModel } from '@/users/repository/entity/user.model'
import { UserRepository } from '@/users/repository/user/user-repository'
import { Test, type TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'

const makeUser = (): UserModel => {
  return {
    id: 'valid_id',
    name: 'John doe',
    email: 'valid@email.com',
    username: 'valid-usernema'
  }
}

class MockUserRepository {
  async findByUsername (username: string): Promise<UserModel | undefined> {
    return makeUser()
  }
}

describe('UserService', () => {
  let service: UserService
  let userRepository: UserRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useClass: MockUserRepository
        }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
    userRepository = module.get<UserRepository>(UserRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Check Username Available', () => {
    it('should return void if user is available', async () => {
      jest.spyOn(userRepository, 'findByUsername').mockResolvedValueOnce(undefined)
      const userRepositorySpy = jest.spyOn(userRepository, 'findByUsername')
      await service.checkUsernameIsAvailable('available-username')
      expect(userRepositorySpy).toHaveBeenCalledWith('available-username')
    })
    it('should throws user if username exits', async () => {
      const result = service.checkUsernameIsAvailable('unavailable-username')
      await expect(result).rejects.toThrow(new AppException('Username already exists'))
    })
  })
})
