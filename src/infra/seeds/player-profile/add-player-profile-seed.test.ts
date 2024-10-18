import { PrismaClient } from '@/infra/database/prisma/client'
import { addPlayerProfiles } from './add-player-profile-seed'

let prisma: PrismaClient

describe('addPlayerProfileSeed', () => {
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

  it('Should add all Player Profiles', async () => {
    await addPlayerProfiles()
    const playerProfile = await prisma.playerProfile.findMany()
    expect(playerProfile.length).toBe(3)
  })
})
