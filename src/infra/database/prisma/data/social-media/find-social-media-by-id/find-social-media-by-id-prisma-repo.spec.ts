import { Prisma, type PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type SocialMediaModel } from '@/models/social-media-model'
import { FindSocialMediaByIdPrismaRepo } from './find-social-media-by-id-prisma-repo'

import { createPrismock } from 'prismock'

const PrismockClient = createPrismock(Prisma)

let prismock: PrismaClient

const makeFakeSocialMedia = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_social_media_name',
  baseUri: 'socialmedia.com/'
})

const makeSut = (): FindSocialMediaByIdPrismaRepo => {
  return new FindSocialMediaByIdPrismaRepo()
}

describe('FindSocialMediaByIdPrismaRepo', () => {
  beforeEach(async () => {
    await prismock.socialMedia.deleteMany()
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

  it('Should return null if prisma findUnique() did not found an social media', async () => {
    const sut = makeSut()
    const socialMedia = await sut.execute('invalid_social_media_id')
    expect(socialMedia).toBe(null)
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.socialMedia, 'findUnique').mockRejectedValue(
      new Error('any_error_message')
    )

    const promise = sut.execute('any_social_media_id')
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
