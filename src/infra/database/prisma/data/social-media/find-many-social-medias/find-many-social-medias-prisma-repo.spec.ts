import { Prisma, type PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type SocialMediaModel } from '@/models/social-media-model'
import { FindManySocialMediasPrismaRepo } from './find-many-social-medias-prisma-repo'

import { createPrismock } from 'prismock'

const PrismockClient = createPrismock(Prisma)

let prismock: PrismaClient

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'some_social_media_id',
  name: 'some_social_media_name',
  baseUri: 'socialmedia.com/'
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
