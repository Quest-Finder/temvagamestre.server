import type { UserModel } from '@/domain/models'
import type { PrismaClient } from '@prisma/client'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { FindUserByEmailPrismaRepo } from './find-user-by-email-prisma-repo'
import MockDate from 'mockdate'

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  nickname: 'any_nick_name',
  phone: 'any_user_phone',
  dateOfBirth: new Date()
})

let prismock: PrismaClient

const makeSut = (): FindUserByEmailPrismaRepo => {
  return new FindUserByEmailPrismaRepo()
}

describe('FindUserByEmailPrismaRepo', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(
      Promise.resolve(prismock)
    )
  })

  beforeEach(async () => {
    await prismock.user.deleteMany()
  })

  afterAll(async () => {
    MockDate.reset()
    await prismock.$disconnect()
  })

  it('Should return an User if findUnique() is a success', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    const user = await sut.execute('any_email@mail.com')
    expect(user).toEqual({ ...makeFakeUserModel(), addressId: null })
  })

  it('Should return null if findUnique() is not found an User', async () => {
    const sut = makeSut()
    const user = await sut.execute('invalid_email@mail.com')
    expect(user).toBe(null)
  })
})
