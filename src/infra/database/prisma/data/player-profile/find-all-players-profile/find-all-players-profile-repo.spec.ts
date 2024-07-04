import { Prisma, type PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type FindAllPlayerProfileRepo } from '@/usecases/contracts/db/player-profile/find-all-players-profile-repo'
import { createPrismock } from 'prismock'
import { FindAllPlayersProfilePrismaRepo } from './find-all-players-profile-repo'

type MakeSutType = {
  sut: FindAllPlayerProfileRepo
}

const PrismockClient = createPrismock(Prisma)

let prismock: PrismaClient

const makeSut = (): MakeSutType => {
  const sut = new FindAllPlayersProfilePrismaRepo()
  return {
    sut
  }
}

describe('FindAllPlayerProfilePrismaRepo', () => {
  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  beforeEach(async () => {
    await prismock.playerProfile.deleteMany()
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })

  it('should return array with players profile', async () => {
    await prismock.playerProfile.createMany({
      data: [
        { id: 'valid-id-1', name: 'profile-name-1', description: 'profile 1 description' },
        { id: 'valid-id-2', name: 'profile-name-2', description: 'profile2 description' }
      ]
    })
    const { sut } = makeSut()
    const result = await sut.execute()
    expect(result).not.toBeNull()
    expect(result.length).toBe(2)
  })
})
