import type { ExternalAuthMappingModel, UserModel } from '@/models'
import type { PrismaClient } from '@prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { PrismockClient } from 'prismock'
import { FindExternalAuthMappingByExternalAuthUserIdPrismaRepo } from './find-external-auth-mapping-by-external-auth-user-id-prisma-repo'

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe',
  dateOfBirth: new Date()
})

const makeFakeExternalAuthMappingModel = (): ExternalAuthMappingModel => ({
  userId: 'any_user_id',
  externalAuthUserId: 'any_external_auth_user_id'
})

let prismock: PrismaClient

const makeSut = (): FindExternalAuthMappingByExternalAuthUserIdPrismaRepo => {
  return new FindExternalAuthMappingByExternalAuthUserIdPrismaRepo()
}

describe('FindUserByEmailPrismaRepo', () => {
  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(
      Promise.resolve(prismock)
    )
  })

  beforeEach(async () => {
    await prismock.externalAuthMapping.deleteMany()
    await prismock.user.deleteMany()
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })

  it('Should return an ExternalAuthMapping if Prisma findUnique() is a success', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.externalAuthMapping.create({ data: makeFakeExternalAuthMappingModel() })
    const externalAuthMapping = await sut.execute('any_external_auth_user_id')
    expect(externalAuthMapping).toEqual(makeFakeExternalAuthMappingModel())
  })

  it('Should return null if Prisma findUnique() is not found', async () => {
    const sut = makeSut()
    const externalAuthMapping = await sut.execute('any_external_auth_user_id')
    expect(externalAuthMapping).toBe(null)
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.externalAuthMapping, 'findUnique').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute('any_external_auth_user_id')
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
