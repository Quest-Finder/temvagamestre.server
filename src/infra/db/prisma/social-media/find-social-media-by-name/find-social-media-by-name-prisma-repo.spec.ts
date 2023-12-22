import { type PrismaClient } from '@prisma/client'
import { FindSocialMediaByNamePrismaRepo } from './find-social-media-by-name-prisma-repo'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

let prismock: PrismaClient

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_social_media_name'
})

const makeSut = (): FindSocialMediaByNamePrismaRepo => {
  return new FindSocialMediaByNamePrismaRepo()
}

describe('FindSocialMediaByNamePrismaRepo', () => {
  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  beforeEach(async () => {
    await prismock.socialMedia.deleteMany()
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })
  it('Should return social media if prisma findFirst() is a success', async () => {
    const sut = makeSut()
    await prismock.socialMedia.create({ data: makeFakeSocialMediaModel() })
    const socialMedia = await sut.execute('any_social_media_name')
    expect(socialMedia).toEqual(makeFakeSocialMediaModel())
  })
})
