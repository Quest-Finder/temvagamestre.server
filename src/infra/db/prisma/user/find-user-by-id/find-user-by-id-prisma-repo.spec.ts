import { type UserModel } from '@/domain/models'
import { type PrismaClient } from '@prisma/client'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { FindUserByIdPrismaRepo } from './find-user-by-id-prisma-repo'

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  nickname: 'any_nick_name',
  phone: 'any_user_phone',
  dateOfBirth: new Date(),
  addressId: 'any_address_id',
  email: 'any_email@mail.com'
})

let prismock: PrismaClient

describe('FindUserByIdPrismaRepo', () => {
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

  it('Should return an User if Prisma findUnique() is a success', async () => {
    const sut = new FindUserByIdPrismaRepo()
    const userModel = makeFakeUserModel()
    await prismock.user.create({ data: userModel })
    const user = await sut.execute('any_user_id')
    expect(user).toEqual(userModel)
  })

  it('Should return null if Prisma findUnique() do not find a User', async () => {
    const sut = new FindUserByIdPrismaRepo()
    const user = await sut.execute('any_user_id')
    expect(user).toBe(null)
  })

  it('Should throw if Prisma findUnique() throws', async () => {
    const sut = new FindUserByIdPrismaRepo()
    jest.spyOn(prismock.user, 'findUnique').mockRejectedValue(
      new Error('any_message')
    )
    const promise = sut.execute('any_user_id')
    await expect(promise).rejects.toThrow(new Error('any_message'))
  })
})
