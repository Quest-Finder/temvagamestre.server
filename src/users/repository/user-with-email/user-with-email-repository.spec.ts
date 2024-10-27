import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { type UserWithEmailModel } from '../entity/user-with-email.model'
import { UserWithEmailRepository } from './user-with-email-repository'

const makeUserWithEmail = (): UserWithEmailModel => {
  return {
    email: 'valid@email.com',
    id: 'valid-id',
    password: 'encoded_password'
  }
}

describe('UserWithEmailRepository', () => {
  let repository: UserWithEmailRepository
  let prismaService: PrismaService
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWithEmailRepository, PrismaService]
    }).compile()
    repository = module.get<UserWithEmailRepository>(UserWithEmailRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  beforeEach(async () => {
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.userConfig.deleteMany()
    await prismaService.userBadge.deleteMany()
    await prismaService.user.deleteMany()
    await prismaService.address.deleteMany()
    await prismaService.cityState.deleteMany()
    await prismaService.userWithEmail.deleteMany()
    await prismaService.playerProfile.deleteMany()
    await prismaService.rpgStyle.deleteMany()
    await prismaService.badge.deleteMany()
    await prismaService.socialMedia.deleteMany()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('Find UserWithEmail by email', () => {
    it('should return undefined when email not found', async () => {
      const response = await repository.findByEmail('invalid@email.com')
      expect(response).not.toBeTruthy()
    })

    it('should return a valid user', async () => {
      await prismaService.userWithEmail.create({
        data: makeUserWithEmail()
      })
      const result = await repository.findByEmail(makeUserWithEmail().email)
      expect(result).toEqual(expect.objectContaining(makeUserWithEmail()))
    })
  })

  describe('Save a UserWithEmail ', () => {
    it('should save a user with email', async () => {
      const inputData = {
        email: 'invalid@email.com',
        password: 'hashed_password'
      }
      const savedUser = await repository.save(inputData)
      expect(savedUser.id).toBeTruthy()
      expect(savedUser).toEqual(expect.objectContaining(inputData))
    })
  })
})
