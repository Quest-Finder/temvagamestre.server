/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type PrismaClient } from '@prisma/client'
import addPlayerProfileSeed from './add-player-profile-seed'

let prisma: PrismaClient

describe('addPlayerProfileSeed', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getPrisma()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  it('Should add all Player Profiles', async () => {
    await addPlayerProfileSeed
    const playerProfile = await prisma.playerProfile.findMany()
    expect(playerProfile.length).toBe(3)
  })
})
