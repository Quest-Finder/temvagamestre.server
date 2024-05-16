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
    await prismock.badge.deleteMany()
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

  it('should return a list with icons data', async () => {
    await prismock.badge.create({
      data: {
        id: 'some_id',
        name: 'some-name',
        description: 'some-description',
        icon: 'https://some-server/some-name.png',
        type: 'any',
        criteria: 'any'
      }
    })
    await prismock.badge.create({
      data: {
        id: 'some_id-2',
        name: 'some-name-2',
        description: 'some-description-2',
        icon: 'https://some-server/some-name-2.png',
        type: 'any-2',
        criteria: 'any-2'
      }
    })
    const { sut } = makeSut()
    const response = await sut.execute()
    expect(response.length).toBe(2)
    expect(response).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'some-name'
      }),
      expect.objectContaining({
        name: 'some-name-2'
      })
    ]))
  })

  it('should return a empty list ', async () => {
    const { sut } = makeSut()
    const response = await sut.execute()
    expect(response.length).toBe(0)
  })
})
