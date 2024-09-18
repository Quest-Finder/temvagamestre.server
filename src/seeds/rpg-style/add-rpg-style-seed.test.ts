/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { type PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { rgpStyleSeed } from './add-rpg-style-seed'

let prisma: PrismaClient

describe('addRpgStyleSeed', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getPrisma()
    await prisma.rpgStyle.deleteMany()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
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
