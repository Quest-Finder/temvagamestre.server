/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
*/

import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type PrismaClient } from '@prisma/client'
import addRpgStyleSeed from './add-rpg-style-seed'

let prisma: PrismaClient

describe('addRpgStyleSeed', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getPrisma()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  it('Should add all RpgStyles', async () => {
    await addRpgStyleSeed
    const rpgStyles = await prisma.rpgStyle.findMany()
    expect(rpgStyles.length).toBe(10)
  })
})
