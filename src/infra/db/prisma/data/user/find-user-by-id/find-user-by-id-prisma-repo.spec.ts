import { type UserModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'
import { type PrismaClient } from '@prisma/client'
import { PrismockClient } from 'prismock'
import { FindUserByIdPrismaRepo } from './find-user-by-id-prisma-repo'

type MakeSutType = {
  sut: FindUserByIdRepo
}

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  nickname: 'any_nick_name',
  phone: 'any_user_phone',
  dateOfBirth: new Date()
})

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

  it('ensure FindUserByIdPrismaRepo call getPrisma function', async () => {
    const { sut } = makeSut()
    const prismockSpy = jest.spyOn(PrismaHelper, 'getPrisma')
    await sut.execute('valid_id')
    expect(prismockSpy).toHaveBeenCalledTimes(1)
  })

  it('should return user if userId exists', async () => {
    const savedUser = await prismock.user.create({
      data: makeFakeUserModel()
    })
    const { sut } = makeSut()
    const result = await sut.execute(savedUser.id)
    expect(result).toEqual(expect.objectContaining(savedUser))
  })
})
