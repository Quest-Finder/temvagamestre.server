import { type PrismaClient } from '@prisma/client'
import { FindManySocialMediasPrismaRepo } from './find-many-social-medias-prisma-repo'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

let prismock: PrismaClient

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'some_social_media_id',
  name: 'some_social_media_name'
})

const makeSut = (): FindManySocialMediasPrismaRepo => {
  return new FindManySocialMediasPrismaRepo()
}

describe('FindManySocialMediasPrismaRepo', () => {
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
  it('Should return a list of social medias when has social medias', async () => {
    const sut = makeSut()
    await prismock.socialMedia.create({ data: makeFakeSocialMediaModel() })
    const socialMedias = await sut.execute()

    expect(socialMedias).toEqual([makeFakeSocialMediaModel()])
  })

  it('Should return an empty list when has no social medias', async () => {
    const sut = makeSut()
    const socialMedias = await sut.execute()

    expect(socialMedias).toEqual([])
  })
})
