import { type UpdateUserConfigsData } from '@/domain/contracts/user'
import { PhoneNotCreatedError } from '@/domain/errors'
import { type UserConfigModel, type UserModel } from '@/domain/models'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'
import { UpdateUserConfigsUseCase } from './update-user-configs-usecase'
import { type AddOrUpdateUserConfigsRepo } from '@/usecases/contracts/db/user-configs'

const makeFakeUpdateUserConfigsData = (): UpdateUserConfigsData => ({
  userId: 'any_user_id',
  allowMessage: true
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  firstName: 'any_first_name',
  lastName: 'any_last_name'
})

const makeFindUserByIdRepo = (): FindUserByIdRepo => {
  class FindUserByIdRepoStub implements FindUserByIdRepo {
    async execute (id: string): Promise<UserModel | null> {
      return {
        ...makeFakeUserModel(),
        phone: 'any_phone'
      }
    }
  }
  return new FindUserByIdRepoStub()
}

const makeAddOrUpdateUserConfigsRepo = (): AddOrUpdateUserConfigsRepo => {
  class AddOrUpdateUserConfigsRepoStub implements AddOrUpdateUserConfigsRepo {
    async execute (data: UserConfigModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddOrUpdateUserConfigsRepoStub()
}

type SutTypes = {
  sut: UpdateUserConfigsUseCase
  findUserByIdRepoStub: FindUserByIdRepo
  addOrUpdateUserConfigsRepoStub: AddOrUpdateUserConfigsRepo
}

const makeSut = (): SutTypes => {
  const findUserByIdRepoStub = makeFindUserByIdRepo()
  const addOrUpdateUserConfigsRepoStub = makeAddOrUpdateUserConfigsRepo()
  const sut = new UpdateUserConfigsUseCase(findUserByIdRepoStub, addOrUpdateUserConfigsRepoStub)
  return { sut, findUserByIdRepoStub, addOrUpdateUserConfigsRepoStub }
}

describe('UpdateUserConfigsUseCase', () => {
  it('Should call FindUserByIdRepo with correct user id', async () => {
    const { sut, findUserByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findUserByIdRepoStub, 'execute')
    await sut.perform(makeFakeUpdateUserConfigsData())
    expect(executeSpy).toHaveBeenCalledWith('any_user_id')
    expect(executeSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return PhoneNotCreatedError if user phone does not exist', async () => {
    const { sut, findUserByIdRepoStub } = makeSut()
    jest.spyOn(findUserByIdRepoStub, 'execute').mockReturnValueOnce(
      Promise.resolve(makeFakeUserModel())
    )
    const result = await sut.perform(makeFakeUpdateUserConfigsData())
    expect(result.value).toEqual(new PhoneNotCreatedError())
  })

  it('Should throw if FindUserByIdRepo throws', async () => {
    const { sut, findUserByIdRepoStub } = makeSut()
    jest.spyOn(findUserByIdRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error('any_message'))
    )
    const promise = sut.perform(makeFakeUpdateUserConfigsData())
    await expect(promise).rejects.toThrow(new Error('any_message'))
  })

  it('Should call AddOrUpdateUserConfigsRepo with correct values', async () => {
    const { sut, addOrUpdateUserConfigsRepoStub } = makeSut()
    const executeSpy = jest.spyOn(addOrUpdateUserConfigsRepoStub, 'execute')
    await sut.perform(makeFakeUpdateUserConfigsData())
    expect(executeSpy).toHaveBeenCalledWith({
      id: 'any_user_id',
      allowMessage: true
    })
  })

  it('Should throw if AddOrUpdateUserConfigsRepo throws', async () => {
    const { sut, addOrUpdateUserConfigsRepoStub } = makeSut()
    jest.spyOn(addOrUpdateUserConfigsRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error('any_message'))
    )
    const promise = sut.perform(makeFakeUpdateUserConfigsData())
    await expect(promise).rejects.toThrow(new Error('any_message'))
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform(makeFakeUpdateUserConfigsData())
    expect(result.isRight()).toBe(true)
  })
})
