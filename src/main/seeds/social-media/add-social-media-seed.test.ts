/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
 */

import { PrismaHelper } from '@/infra/db/prisma/helpers'
import type { PrismaClient } from '@prisma/client'
import addSocialMediaSeed from './add-social-media-seed'

let prisma: PrismaClient

describe('addSocialMediaSeed', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getPrisma()
  })

  beforeEach(async () => {
    await prisma.socialMedia.deleteMany()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  it('Should add all Social Medias', async () => {
    await addSocialMediaSeed
    const socialMedias = await prisma.socialMedia.findMany()
    expect(socialMedias.length).toBe(4)
  })
})
