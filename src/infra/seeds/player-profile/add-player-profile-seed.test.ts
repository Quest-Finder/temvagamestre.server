/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { PrismaClient } from '@/infra/database/prisma/client'
import { addPlayerProfiles } from './add-player-profile-seed'

let prisma: PrismaClient

describe('addPlayerProfileSeed', () => {
  beforeAll(async () => {
    prisma = new PrismaClient()
  })

  beforeEach(async () => {
    await prisma.playerProfile.deleteMany()
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
