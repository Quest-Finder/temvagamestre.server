import { type PrismaClient } from '@prisma/client'
import { AddOrUpdateUserSocialMediaByIdsPrismaRepo } from './add-or-update-user-social-media-by-ids-prisma-repo'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import MockDate from 'mockdate'
import { type UserSocialMediaModel } from '@/domain/models/user/user-social-media-model'
import { type UserModel } from '@/domain/models'

let prismock: PrismaClient

const makeFakeUserSocialMedia = (): UserSocialMediaModel => ({
  userId: 'any_user_id',
  socialMediaId: 'any_social_media_id',
  link: 'any_link'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  nickname: 'any_nick_name',
  phone: 'any_user_phone',
  dateOfBirth: new Date(),
  addressId: 'any_address_id',
  email: 'any_email'
})

const makeFakeSocialMedia = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_social_media_name'
})

const makeSut = (): AddOrUpdateUserSocialMediaByIdsPrismaRepo => {
  return new AddOrUpdateUserSocialMediaByIdsPrismaRepo()
}

describe('AddOrUpdateUserSocialMediaByIdsPrismaRepo', () => {
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
