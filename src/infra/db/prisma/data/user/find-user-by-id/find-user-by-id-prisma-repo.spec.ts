import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'
import { type PrismaClient } from '@prisma/client'
import { PrismockClient } from 'prismock'
import { FindUserByIdPrismaRepo } from './find-user-by-id-prisma-repo'

type MakeSutType = {
  sut: FindUserByIdRepo
}

const makeSut = (): MakeSutType => {
  const sut = new FindUserByIdPrismaRepo()
  return { sut }
}

let prismock: PrismaClient

describe('FindUserByIdRepo', () => {
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

  it('should return null if user not exits', async () => {
    const { sut } = makeSut()
    const result = await sut.execute('valid_id')
    expect(result).toBeNull()
  })
})
