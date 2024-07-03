/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { addSocialMediaSeed } from './add-social-media-seed'

let prisma: PrismaClient

describe('addSocialMediaSeed', () => {
  beforeAll(async () => {
    prisma = new PrismaClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValueOnce(
      Promise.resolve(prisma)
    )
  })

  beforeEach(async () => {
    await prisma.socialMedia.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('Should add all Social Medias', async () => {
    await addSocialMediaSeed()
    const socialMedias = await prisma.socialMedia.findMany()
    expect(socialMedias.length).toBe(5)
    expect(socialMedias).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'Instagram',
        baseUri: 'instagram.com/'
      }),
      expect.objectContaining({
        name: 'Discord',
        baseUri: 'discordapp.com/users/'
      }),
      expect.objectContaining({
        name: 'X',
        baseUri: 'x.com/'
      }),
      expect.objectContaining({
        name: 'Reddit',
        baseUri: 'reddit.com/user/'
      }),
      expect.objectContaining({
        name: 'Facebook',
        baseUri: 'facebook.com/'
      })
    ]))
  })
})
