import { Prisma, type PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type UserModel } from '@/models'
import { type SocialMediaModel } from '@/models/social-media-model'
import { type UserSocialMediaModel } from '@/models/user-social-media-model'
import MockDate from 'mockdate'
import { SaveUserSocialMediaPrismaRepo } from './save-user-social-media-prisma-repo'

import { createPrismock } from 'prismock'

const PrismockClient = createPrismock(Prisma)

let prismock: PrismaClient

const makeFakeUserSocialMedia = (): UserSocialMediaModel => ({
  userId: 'any_user_id',
  socialMediaId: 'any_social_media_id',
  link: 'any_link'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe',
  dateOfBirth: new Date()
})

const makeFakeSocialMedia = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_social_media_name',
  baseUri: 'socialmedia.com/'
})

const makeSut = (): SaveUserSocialMediaPrismaRepo => {
  return new SaveUserSocialMediaPrismaRepo()
}

describe('SaveUserSocialMediaPrismaRepo', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  beforeEach(async () => {
    await prismock.userSocialMedia.deleteMany()
    await prismock.socialMedia.deleteMany()
    await prismock.user.deleteMany()
  })

  afterAll(async () => {
    MockDate.reset()
    await prismock.$disconnect()
  })

  it('Should add User social media when relation does not exist', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.socialMedia.create({ data: makeFakeSocialMedia() })
    await sut.execute(makeFakeUserSocialMedia())
    const userSocialMedia = await prismock.userSocialMedia.findUnique({
      where: {
        userId_socialMediaId: {
          userId: 'any_user_id',
          socialMediaId: 'any_social_media_id'
        }
      }
    })
    expect(userSocialMedia).toEqual(
      makeFakeUserSocialMedia()
    )
  })

  it('Should update User social media when relation exists', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.socialMedia.create({ data: makeFakeSocialMedia() })
    await prismock.userSocialMedia.create({ data: makeFakeUserSocialMedia() })
    await sut.execute({ ...makeFakeUserSocialMedia(), link: 'updated_link' })
    const userSocialMedia = await prismock.userSocialMedia.findUnique({
      where: {
        userId_socialMediaId: {
          userId: 'any_user_id',
          socialMediaId: 'any_social_media_id'
        }
      }
    })
    expect(userSocialMedia).toEqual({ ...makeFakeUserSocialMedia(), link: 'updated_link' })
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.userSocialMedia, 'upsert').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute(makeFakeUserSocialMedia())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
