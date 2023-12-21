import { type PrismaClient } from '@prisma/client'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { AddSocialMediaPrismaRepo } from './add-social-media-prisma-repo'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

let prismock: PrismaClient

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_social_media_name'
})

const makeSut = (): AddSocialMediaPrismaRepo => {
  return new AddSocialMediaPrismaRepo()
}

describe('AddSocialMediaPrismaRepo', () => {
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
  it('Should create a social media if prisma create() is a success', async () => {
    const sut = makeSut()
    await sut.execute(makeFakeSocialMediaModel())
    const socialMedia = await prismock.socialMedia.findUnique({ where: { id: 'any_social_media_id' } })
    expect(socialMedia).toEqual(makeFakeSocialMediaModel())
  })
})
