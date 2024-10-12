/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { rgpStyleSeed } from './add-rpg-style-seed'

let prisma: PrismaClient

describe('addRpgStyleSeed', () => {
  beforeAll(async () => {
    prisma = new PrismaClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValueOnce(
      Promise.resolve(prisma)
    )
  })

  beforeEach(async () => {
    await prisma.rpgStyle.deleteMany()
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
