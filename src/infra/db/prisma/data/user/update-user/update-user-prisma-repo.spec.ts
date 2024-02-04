import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { type UpdateUserRepoData } from '@/usecases/contracts/db/user'
import type { PrismaClient } from '@prisma/client'
import MockDate from 'mockdate'
import { PrismockClient } from 'prismock'
import { UpdateUserPrismaRepo } from './update-user-prisma-repo'
import { type UserModel } from '@/domain/models'

const makeFakeUpdateUserRepoData = (): UpdateUserRepoData => ({
  id: 'any_user_id',
  firstName: 'other_first_name',
  lastName: 'other_last_name',
  phone: 'other_phone',
  dateOfBirth: new Date('2000-12-31T00:00:00'),
  nickname: 'other_nickname'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  nickname: 'any_nick_name',
  phone: 'any_user_phone',
  dateOfBirth: new Date('1999-11-30T00:00:00'),
  email: 'any_email@mail.com'
})

let prismock: PrismaClient

const makeSut = (): UpdateUserPrismaRepo => {
  return new UpdateUserPrismaRepo()
}

describe('UpdateUserPrismaRepo', () => {
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

  it('Should update a User if prisma update() is a success', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await sut.execute(makeFakeUpdateUserRepoData())
    const user = await prismock.user.findUnique({ where: { id: 'any_user_id' } })
    expect(user).toEqual({
      addressId: null,
      email: 'any_email@mail.com',
      ...makeFakeUpdateUserRepoData()
    })
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.user, 'update').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute(makeFakeUpdateUserRepoData())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
