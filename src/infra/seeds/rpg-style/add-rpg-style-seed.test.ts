import { PrismaClient } from '@/infra/database/prisma/client'
import { rgpStyleSeed } from './add-rpg-style-seed'

let prisma: PrismaClient

describe('addRpgStyleSeed', () => {
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

  it('Should add all RpgStyles', async () => {
    await rgpStyleSeed()
    const rpgStyles = await prisma.rpgStyle.findMany()
    expect(rpgStyles.length).toBe(10)
  })

  it('Should not add create rpg styles', async () => {
    await rgpStyleSeed()
    const rpgStyles = await prisma.rpgStyle.findMany()
    expect(rpgStyles.length).toBe(10)
    await rgpStyleSeed()
    const secondRpgStylesCreate = await prisma.rpgStyle.findMany()
    expect(secondRpgStylesCreate.length).toBe(10)
  })
})
