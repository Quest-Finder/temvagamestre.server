import { type PrismaClient } from '@prisma/client'
import { AddOrUpdateUserConfigsPrismaRepo } from './add-or-update-user-configs-prisma-repo'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { type UserModel, type UserConfigModel } from '@/domain/models'

const makeFakeUserConfigModel = (): UserConfigModel => ({
  id: 'any_user_id',
  allowMessage: true
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  email: 'any_email@mail.com'
})

let prismock: PrismaClient

describe('AddOrUpdateUserConfigsPrismaRepo', () => {
  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(
      Promise.resolve(prismock)
    )
  })

  beforeEach(async () => {
    await prismock.user.deleteMany()
    await prismock.userConfig.deleteMany()
  })

  it('Should add an UserConfig if Prisma create() is a success', async () => {
    const sut = new AddOrUpdateUserConfigsPrismaRepo()
    await prismock.user.create({ data: makeFakeUserModel() })
    await sut.execute(makeFakeUserConfigModel())
    const userConfig = await prismock.userConfig.findUnique({
      where: { id: 'any_user_id' }
    })
    expect(userConfig).toEqual(makeFakeUserConfigModel())
  })

  it('Should update UserConfig if already exist', async () => {
    const sut = new AddOrUpdateUserConfigsPrismaRepo()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userConfig.create({ data: { id: 'any_user_id', allowMessage: false } })
    const userConfig = await prismock.userConfig.findUnique({
      where: { id: 'any_user_id' }
    })
    await sut.execute(makeFakeUserConfigModel())
    const userConfigUpdated = await prismock.userConfig.findUnique({
      where: { id: 'any_user_id' }
    })
    expect(userConfig).toEqual({ id: 'any_user_id', allowMessage: false })
    expect(userConfigUpdated).toEqual(makeFakeUserConfigModel())
  })
})
