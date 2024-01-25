import { type RpgStyleModel } from '@/domain/models'
import { AddRpgStylePrismaRepo } from './add-rpg-style-prisma-repo'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { type PrismaClient } from '@prisma/client'

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
})
