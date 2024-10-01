import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { type UserModel } from '../entity/user.model'
import { UserRepository } from './user-repository'

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe',
  externalAuthId: 'valid-external-auth-id',
  dateOfBirth: new Date()
})

describe('UserRepository', () => {
  let repository: UserRepository
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, PrismaService]
    }).compile()

    repository = module.get<UserRepository>(UserRepository)
    prismaService = module.get<PrismaService>(PrismaService)
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.user.deleteMany()
  })

  afterEach(async () => {
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.user.deleteMany()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('Find User By Email', () => {
    it('should return undefined if email not found', async () => {
      const result = await repository.findByEmail('invalid@email.com')
      expect(result).not.toBeTruthy()
    })

    it('should return a user if email has found', async () => {
      await prismaService.user.create({
        data: makeFakeUserModel()
      })
      const result = await repository.findByEmail('any_email@mail.com')
      expect(result).toBeTruthy()
      expect(result).toEqual(expect.objectContaining({
        id: 'any_user_id',
        email: 'any_email@mail.com',
        name: 'John Doe'
      }))
    })
  })

  describe('Find User By External Auth Id', () => {
    it('should return undefined if external auth id not found', async () => {
      const result = await repository.findByExternalAuthId('new-external-auth-id')
      expect(result).not.toBeTruthy()
    })

    it('should return a user if external auth id has found', async () => {
      await prismaService.user.create({
        data: makeFakeUserModel()
      })
      const result = await repository.findByExternalAuthId('valid-external-auth-id')
      expect(result).toBeTruthy()
      expect(result).toEqual(expect.objectContaining({
        id: 'any_user_id',
        email: 'any_email@mail.com',
        name: 'John Doe',
        externalAuthId: 'valid-external-auth-id'
      }))
    })
  })

  describe('Save a New User', () => {
    it('should save a user', async () => {
      const user = await repository.createUser({
        email: 'valid@email.com',
        name: 'Valid name'
      })
      expect(user.id).toBeTruthy()
      expect(user.name).toBe('Valid name')
      expect(user.email).toBe('valid@email.com')
    })
  })

  describe('Find User By Id', () => {
    it('should return undefined if user id not exists', async () => {
      const response = await repository.findById('invalid-id')
      expect(response).not.toBeTruthy()
    })
    it('should return user if user exits', async () => {
      await prismaService.user.create({
        data: makeFakeUserModel()
      })
      const response = await repository.findById('any_user_id')
      expect(response).toBeTruthy()
      expect(response).toEqual(expect.objectContaining({
        id: 'any_user_id',
        email: 'any_email@mail.com',
        name: 'John Doe',
        externalAuthId: 'valid-external-auth-id'
      }))
    })
  })
})
