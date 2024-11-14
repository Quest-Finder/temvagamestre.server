import { JwtSignAdapterV2 } from '@/infra/cryptography/jwt-sign-adapter-v2'
import { type UserWithEmailModel } from '@/users/repository/entity/user-with-email.model'
import { type UserModel } from '@/users/repository/entity/user.model'
import { UserWithEmailRepository, type UserWithEmailData } from '@/users/repository/user-with-email/user-with-email-repository'
import { type UserInputRepository, UserRepository } from '@/users/repository/user/user-repository'
import { ConflictException } from '@nestjs/common'
import { Test, type TestingModule } from '@nestjs/testing'
import bcrypt from 'bcrypt'
import { SignUpService } from './sign-up-with-email.service'

const makeUserWithEmail = (): UserWithEmailModel => {
  return {
    email: 'valid@email.com',
    id: 'valid-id',
    password: 'encoded_password'
  }
}
class MockUserWithEmailRepository {
  async findByEmail (email: string): Promise<UserWithEmailModel | undefined> {
    return makeUserWithEmail()
  }

  async save (data: UserWithEmailData): Promise<UserWithEmailModel> {
    return makeUserWithEmail()
  }
}

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

describe('SignUpService', () => {
  let service: SignUpService
  let repository: UserWithEmailRepository
  let userRepository: UserRepository
  const SALTED_ROUNDS = 10

  const mockHashAdapter = {
    hash: jest.fn().mockResolvedValue('hashed-password')
  }

  const mockJwtSignAdapter = {
    execute: jest.fn().mockResolvedValue({ token: 'some-token' })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpService,
        { provide: 'HashAdapter', useValue: mockHashAdapter },
        { provide: JwtSignAdapterV2, useValue: mockJwtSignAdapter },
        { provide: UserWithEmailRepository, useClass: MockUserWithEmailRepository },
        { provide: UserRepository, useClass: MockUserRepository }
      ]
    }).compile()
    service = module.get<SignUpService>(SignUpService)
    repository = module.get<UserWithEmailRepository>(UserWithEmailRepository)
    userRepository = module.get<UserRepository>(UserRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a new user and return a token', async () => {
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('hashed-password')
    const bcryptHashSpy = jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('hashed-password')
    const repositorySaveSpy = jest.spyOn(repository, 'save')
    jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(undefined)
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(undefined)
    mockJwtSignAdapter.execute.mockResolvedValueOnce({ token: 'some-token' })

    const result = await service.create({ email: 'newuser@example.com', password: '123456' })

    expect(bcryptHashSpy).toHaveBeenCalledWith('123456', SALTED_ROUNDS)
    expect(repositorySaveSpy).toHaveBeenCalledWith({
      email: 'newuser@example.com',
      password: 'hashed-password'
    })
    expect(result).toEqual({ token: 'some-token' })
  })

  it('should throw ConflictException if user already exists', async () => {
    const repositoryFindByEmailSpy = jest.spyOn(repository, 'findByEmail')

    await expect(service.create({ email: 'test@example.com', password: 'whateverpassword123' }))
      .rejects.toThrow(new ConflictException('Já existe um email cadastrado com o test@example.com informado'))

    expect(repositoryFindByEmailSpy).toHaveBeenCalledWith('test@example.com')
  })
  it('should throw ConflictException if user already exists in application user', async () => {
    jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(undefined)
    await expect(service.create({ email: 'test@example.com', password: 'whateverpassword123' }))
      .rejects.toThrow(new ConflictException('Já existe um email cadastrado com o test@example.com informado'))
  })
})
