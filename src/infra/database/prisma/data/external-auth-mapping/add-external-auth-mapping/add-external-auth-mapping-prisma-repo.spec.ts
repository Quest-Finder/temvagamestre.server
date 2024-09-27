import { Prisma, type PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import type { ExternalAuthMappingModel, UserModel } from '@/models'
import { createPrismock } from 'prismock'
import { AddExternalAuthMappingPrismaRepo } from './add-external-auth-mapping-prisma-repo'
const PrismockClient = createPrismock(Prisma)

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe'
})

const makeFakeExternalAuthMappingModel = (): ExternalAuthMappingModel => ({
  userId: 'any_user_id',
  externalAuthUserId: 'any_external_auth_user_id'
})

let prismock: PrismaClient

const makeSut = (): AddExternalAuthMappingPrismaRepo => {
  return new AddExternalAuthMappingPrismaRepo()
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

  it('Should create a ExternalAuthMapping if Prisma create() is a success', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await sut.execute(makeFakeExternalAuthMappingModel())
    const externalAuthMapping = await prismock.externalAuthMapping.findUnique({
      where: { externalAuthUserId: 'any_external_auth_user_id' }
    })
    expect(externalAuthMapping).toEqual(makeFakeExternalAuthMappingModel())
  })

  it('Should create a relationship between ExternalAuthMapping and User', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await sut.execute(makeFakeExternalAuthMappingModel())
    const userAndExternalAuthMapping = await prismock.user.findUnique({
      where: { id: 'any_user_id' },
      include: { externalAuthMapping: true }
    })
    expect(userAndExternalAuthMapping).toEqual({
      ...makeFakeUserModel(),
      addressId: null,
      dateOfBirth: null,
      pronoun: "I don't want to share any pronouns",
      username: null,
      playerProfileId: null,
      title: null,
      bio: null,
      externalAuthId: null,
      externalAuthMapping: makeFakeExternalAuthMappingModel(),
      cityStateId: null
    })
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.externalAuthMapping, 'create').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute(makeFakeExternalAuthMappingModel())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
