import { type PrismaClient } from '@prisma/client'
import { FindSocialMediaByNamePrismaRepo } from './find-social-media-by-name-prisma-repo'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
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

  it('Should return null if prisma findFirst() not found a social media', async () => {
    const sut = makeSut()
    const socialMedia = await sut.execute('invalid_social_media_name')
    expect(socialMedia).toBe(null)
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.socialMedia, 'findFirst').mockRejectedValue(new Error('any_error_message'))

    const promise = sut.execute('any_social_media_name')
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
