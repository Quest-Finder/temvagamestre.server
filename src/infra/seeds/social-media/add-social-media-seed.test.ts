import { PrismaClient } from '@/infra/database/prisma/client'
import { addSocialMediaSeed } from './add-social-media-seed'

let prisma: PrismaClient

describe('addSocialMediaSeed', () => {
  beforeAll(async () => {
    prisma = new PrismaClient()
  })

  beforeEach(async () => {
    await prisma.userPreferenceRpgStyle.deleteMany()
    await prisma.userPreferenceDayPeriod.deleteMany()
    await prisma.userPreferenceGamePlace.deleteMany()
    await prisma.userPreferencePlayersRange.deleteMany()
    await prisma.externalAuthMapping.deleteMany()
    await prisma.userPreference.deleteMany()
    await prisma.userSocialMedia.deleteMany()
    await prisma.userConfig.deleteMany()
    await prisma.userBadge.deleteMany()
    await prisma.user.deleteMany()
    await prisma.address.deleteMany()
    await prisma.cityState.deleteMany()
    await prisma.userWithEmail.deleteMany()
    await prisma.playerProfile.deleteMany()
    await prisma.rpgStyle.deleteMany()
    await prisma.badge.deleteMany()
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
