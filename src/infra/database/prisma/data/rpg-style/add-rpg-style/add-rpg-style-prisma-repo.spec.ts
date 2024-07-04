import { Prisma, type PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type RpgStyleModel } from '@/models'
import { AddRpgStylePrismaRepo } from './add-rpg-style-prisma-repo'

import { createPrismock } from 'prismock'
const PrismockClient = createPrismock(Prisma)

let prismock: PrismaClient

const makeFakeRpgStyleModel = (): RpgStyleModel => ({
  id: 'any_rpg_style_id',
  name: 'any_rpg_style_name'
})

const makeSut = (): AddRpgStylePrismaRepo => {
  return new AddRpgStylePrismaRepo()
}

describe('AddRpgStylePrismaRepo', () => {
  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  beforeEach(async () => {
    await prismock.rpgStyle.deleteMany()
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })

  it('Should create a rpg style if prisma create() is a success', async () => {
    const sut = makeSut()
    await sut.execute(makeFakeRpgStyleModel())
    const rpgStyle = await prismock.rpgStyle.findUnique({ where: { id: 'any_rpg_style_id' } })
    expect(rpgStyle).toEqual(makeFakeRpgStyleModel())
  })

  it('Should throw if prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.rpgStyle, 'create').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute(makeFakeRpgStyleModel())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
