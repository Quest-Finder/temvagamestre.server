import { type PrismaClient } from '@prisma/client'
import { FindSocialMediaByIdPrismaRepo } from './find-social-media-by-id-prisma-repo'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

let prismock: PrismaClient

const makeFakeSocialMedia = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_social_media_name'
})

const makeSut = (): FindSocialMediaByIdPrismaRepo => {
  return new FindSocialMediaByIdPrismaRepo()
}

describe('FindSocialMediaByIdPrismaRepo', () => {
  beforeEach(async () => {
    await prismock.user.deleteMany()
  })

  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })

  it('Should return an social media if prisma findUnique() is a success', async () => {
    const sut = makeSut()
    await prismock.socialMedia.create({ data: makeFakeSocialMedia() })
    const socialMedia = await sut.execute('any_social_media_id')
    expect(socialMedia).toEqual({ ...makeFakeSocialMedia() })
  })
})
