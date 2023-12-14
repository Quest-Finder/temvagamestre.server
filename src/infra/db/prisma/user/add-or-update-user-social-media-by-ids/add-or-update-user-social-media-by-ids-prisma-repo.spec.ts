import { type User, type PrismaClient } from '@prisma/client'
import { AddOrUpdateUserSocialMediaByIdsPrismaRepo } from './add-or-update-user-social-media-by-ids-prisma-repo'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'
import MockDate from 'mockdate'
import { type UserSocialMediaModel } from '@/domain/models/user/user-social-media-model'

let prismock: PrismaClient

const makeFakeUserSocialMedia = (): UserSocialMediaModel => ({
  userId: 'any_user_id',
  socialMediaId: 'any_social_media_id',
  link: 'any_link'
})

const makeFakeUserModel = (): User => ({
  id: 'any_user_id',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  nickname: 'any_nick_name',
  phone: 'any_user_phone',
  dateOfBirth: new Date(),
  addressId: 'any_address_id'
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
    await sut.execute({ userId: 'any_user_id', socialMediaId: 'any_social_media_id', link: 'any_link' })

    const userSocialMedia = await prismock.userSocialMedia.findUnique({
      where: {
        userId_socialMediaId: {
          userId: 'any_user_id',
          socialMediaId: 'any_social_media_id'
        }
      }
    })

    expect(userSocialMedia).toBeTruthy()
    expect(userSocialMedia?.link).toBe('any_link')
  })

  it('Should update User social media when relation exists', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.socialMedia.create({ data: makeFakeSocialMedia() })
    await prismock.userSocialMedia.create({ data: makeFakeUserSocialMedia() })
    await sut.execute({ userId: 'any_user_id', socialMediaId: 'any_social_media_id', link: 'updated_link' })

    const userSocialMedia = await prismock.userSocialMedia.findUnique({
      where: {
        userId_socialMediaId: {
          userId: 'any_user_id',
          socialMediaId: 'any_social_media_id'
        }
      }
    })

    expect(userSocialMedia).toBeTruthy()
    expect(userSocialMedia?.link).toBe('updated_link')
  })
})
