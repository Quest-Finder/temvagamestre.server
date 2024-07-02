import { PrismaClient } from '../client'
import { PrismaHelper as sut } from './prisma-helper'

let prisma: PrismaClient

describe('Prisma Helper', () => {
  afterAll(async () => {
    await sut.disconnect()
  })

  it('Should reconnect if Prisma down', async () => {
    prisma = await sut.getPrisma()
    expect(prisma).toBeInstanceOf(PrismaClient)
    await sut.disconnect()
    prisma = await sut.getPrisma()
    expect(prisma).toBeInstanceOf(PrismaClient)
  })
})
