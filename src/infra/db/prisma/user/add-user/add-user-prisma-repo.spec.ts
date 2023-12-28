import type { UserModel } from '@/domain/models'
import type { PrismaClient } from '@prisma/client'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import MockDate from 'mockdate'
import { AddUserPrismaRepo } from './add-user-prisma-repo'

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

const makeSut = (): AddUserPrismaRepo => {
  return new AddUserPrismaRepo()
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

  it('Should create a User if prisma create() is a success', async () => {
    const sut = makeSut()
    await sut.execute(makeFakeUserModel())
    const user = await prismock.user.findUnique({ where: { id: 'any_user_id' } })
    expect(user).toEqual({ ...makeFakeUserModel(), addressId: null })
  })
})
