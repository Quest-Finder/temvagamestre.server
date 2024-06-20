import { type UserModel } from '@/models'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type FindUserByUsernameRepo } from '@/usecases/contracts/db/user/find-user-by-username-repo'
import type { PrismaClient } from '@prisma/client'
import MockDate from 'mockdate'
import { PrismockClient } from 'prismock'
import { FindUserByUsernamePrismaRepo } from './find-user-by-username-prisma-repo'

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe',
  username: 'exits-username',
  dateOfBirth: new Date()
})

let prismock: PrismaClient

const makeSut = (): FindUserByUsernameRepo => {
  return new FindUserByUsernamePrismaRepo()
}

describe('FindUserByUsernamePrismaRepo', () => {
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

  it('Should return an User if prisma find username exists', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    const user = await sut.execute('exits-username')
    expect(user).toEqual(expect.objectContaining({
      id: 'any_user_id',
      email: 'any_email@mail.com',
      name: 'John Doe',
      username: 'exits-username'
    }))
  })

  it('Should return null if prisma findUnique() not found an User', async () => {
    const sut = makeSut()
    const user = await sut.execute('new-username')
    expect(user).toBe(null)
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.user, 'findFirst').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute('new-username')
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
