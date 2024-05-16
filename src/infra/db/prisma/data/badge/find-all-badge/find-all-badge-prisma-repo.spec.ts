import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type FindAllBadgeRepo } from '@/usecases/contracts/db/badge/find-all-badge-repo'
import { type PrismaClient } from '@prisma/client'
import { PrismockClient } from 'prismock'
import { FindAllBadgePrismaRepo } from './find-all-badge-prisma-repo'

type MakeSutType = {
  sut: FindAllBadgeRepo
}

let prismock: PrismaClient

const makeSut = (): MakeSutType => {
  const sut = new FindAllBadgePrismaRepo()
  return {
    sut
  }
}

describe('FindAllBadgePrismaRepo', () => {
  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(
      Promise.resolve(prismock)
    )
  })

  beforeEach(async () => {
    await prismock.user.deleteMany()
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })

  it('should throws if prisma throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'execute').mockRejectedValueOnce(new Error())
    const response = sut.execute()
    await expect(response).rejects.toThrow()
  })
})
