import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { type UserModel } from '../entity/user.model'
import { UserRepository, type UserRegisterRepositoryInput } from './user-repository'

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
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.user.deleteMany()
    await prismaService.socialMedia.deleteMany()
    await prismaService.rpgStyle.deleteMany()
    await prismaService.cityState.deleteMany()
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

  describe('Find User By username', () => {
    it('should return undefined if user id not exists', async () => {
      const response = await repository.findByUsername('invalid-username')
      expect(response).not.toBeTruthy()
    })
    it('should return user if user exits', async () => {
      await prismaService.user.create({
        data: {
          ...makeFakeUserModel(),
          username: 'valid-username'
        }
      })
      const response = await repository.findByUsername('valid-username')
      expect(response).toBeTruthy()
      expect(response).toEqual(expect.objectContaining({
        id: 'any_user_id',
        email: 'any_email@mail.com',
        name: 'John Doe',
        externalAuthId: 'valid-external-auth-id',
        username: 'valid-username'
      }))
    })
  })

  describe('Update user by Id', () => {
    it('should update user data', async () => {
      await prismaService.socialMedia.create({
        data: {
          id: 'valid-social-media-id',
          name: 'FakeSocialMedial',
          baseUri: 'http://Fakeuir'
        }
      })
      await prismaService.rpgStyle.create({
        data: {
          id: 'valid-rpg-style',
          name: 'Fake RPG Style'
        }
      })
      await prismaService.cityState.create({
        data: {
          id: 'valid-city-state-id',
          city: 'Rio de janeiro',
          uf: 'RJ',
          lifeInBrazil: true
        }
      })
      await prismaService.user.create({
        data: makeFakeUserModel()
      })

      const inputData: UserRegisterRepositoryInput = {
        id: makeFakeUserModel().id,
        name: 'John Doe',
        externalAuthId: 'valid-external-auth-id',
        pronoun: 'I don\'t want to share any pronouns',
        username: '',
        socialMedias: [
          { socialMediaId: 'valid-social-media-id', userLink: '/media' }
        ],
        rpgStyles: ['valid-rpg-style'],
        cityStateId: 'valid-city-state-id',
        dateOfBirth: new Date()
      }

      const result = await repository.register(inputData)
      const userSocialMedial = await prismaService.userSocialMedia.findMany({
        where: {
          userId: makeFakeUserModel().id
        }
      })
      const userRgpStyle = await prismaService.userPreferenceRpgStyle.findMany({
        where: {
          userPreferenceId: makeFakeUserModel().id
        }
      })
      expect(result.pronoun).toEqual(inputData.pronoun)
      expect(userSocialMedial.length).toBe(1)
      expect(userSocialMedial[0]).toEqual(
        expect.objectContaining({ userId: 'any_user_id', socialMediaId: 'valid-social-media-id', link: '/media' })
      )
      expect(userRgpStyle.length).toBe(1)
      expect(userRgpStyle).toEqual(expect.arrayContaining([]))
    })
  })
})
