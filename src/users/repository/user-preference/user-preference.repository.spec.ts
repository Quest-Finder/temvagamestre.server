import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { type UserPreferenceModel } from '../entity/user-preference.model'
import { UserPreferenceRepository } from './user-preference.repository'

const fakeInputData = (): UserPreferenceModel => {
  return {
    id: 'user-id',
    activeType: 'player',
    frequency: 'daily'
  }
}

describe('UserPreferenceRepository', () => {
  let repository: UserPreferenceRepository
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPreferenceRepository, PrismaService]
    }).compile()

    repository = module.get<UserPreferenceRepository>(UserPreferenceRepository)
    prismaService = module.get<PrismaService>(PrismaService)
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.user.deleteMany()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('Save a user preference', () => {
    it('should save a user preference', async () => {
      await prismaService.user.createMany({
        data: {
          id: 'user-id',
          email: 'valid-email',
          name: 'John doe'
        }
      })
      const result = await repository.save(fakeInputData())
      expect(result).toEqual(expect.objectContaining(fakeInputData()))
    })
  })

  describe('Find User preference By Id', () => {
    it('should return undefined if id not exits', async () => {
      const result = await repository.findById('invalid-id')
      expect(result).not.toBeTruthy()
    })

    it('should return undefined if id not exits', async () => {
      await prismaService.user.createMany({
        data: {
          id: 'user-id',
          email: 'valid-email',
          name: 'John doe'
        }
      })
      await prismaService.userPreference.create({
        data: fakeInputData()
      })
      const result = await repository.findById(fakeInputData().id)
      expect(result).toEqual(expect.objectContaining(fakeInputData()))
    })
  })

  describe('Update User Preference', () => {
    it('should return a error if id not exits', async () => {
      const result = repository.update({
        id: 'invalid-user-id',
        activeType: 'player'
      })
      await expect(result).rejects.toThrow()
    })
    it('should return a updated data if success', async () => {
      await prismaService.user.createMany({
        data: {
          id: 'user-id',
          email: 'valid-email',
          name: 'John doe'
        }
      })
      await prismaService.userPreference.create({
        data: fakeInputData()
      })
      const result = await repository.update({
        id: 'user-id',
        activeType: 'gameMaster',
        frequency: 'weekly'
      })
      expect(result).toEqual(expect.objectContaining({
        id: 'user-id',
        activeType: 'gameMaster',
        frequency: 'weekly'
      }))
    })
  })
})
