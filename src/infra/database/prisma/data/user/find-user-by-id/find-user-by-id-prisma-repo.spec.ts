import { Prisma, type PrismaClient } from '@/infra/database/prisma/client'
import { type UserModel } from '@/models'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user/find-user-by-id-repo'
import { createPrismock } from 'prismock'
import { PrismaHelper } from '../../../helpers'
import { FindUserByIdPrismaRepo } from './find-user-by-id-prisma-repo'

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe',
  dateOfBirth: new Date()
})

const PrismockClient = createPrismock(Prisma)

const makeSut = (): FindUserByIdRepo => {
  return new FindUserByIdPrismaRepo()
}

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

  it('should return a user if user id exitis', async () => {
    await prismock.user.create({ data: makeFakeUserModel() })
    const sut = makeSut()
    const reponse = await sut.execute('any_user_id')
    expect(reponse).not.toBeNull()
  })

  it('Should return null if user not found', async () => {
    const sut = makeSut()
    const reponse = await sut.execute('invalid_id')
    expect(reponse).toBeNull()
  })

  it('Should throw if Prisma throws', async () => {
    jest.spyOn(prismock.user, 'findUnique').mockRejectedValue(
      new Error('any_error_message')
    )
    const sut = makeSut()
    const response = sut.execute('invalid_id')
    await expect(response).rejects.toThrow(new Error('any_error_message'))
  })
})
