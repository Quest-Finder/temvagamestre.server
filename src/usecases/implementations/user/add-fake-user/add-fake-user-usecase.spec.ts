import type { AddUser, AddUserData, AddUserResponse } from '@/domain/contracts/user'
import { AddFakeUserUseCase } from './add-fake-user-usecase'
import { right } from '@/shared/either'
import { type IdBuilder } from '@/usecases/contracts/id'

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): string { return 'any_fake_user_id' }
  }
  return new IdBuilderStub()
}

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async perform (account: AddUserData): Promise<AddUserResponse> {
      return await Promise.resolve(right(null))
    }
  }
  return new AddUserStub()
}

type SutTypes = {
  sut: AddFakeUserUseCase
  idBuilderStub: IdBuilder
  addUserStub: AddUser
}

const makeSut = (): SutTypes => {
  const idBuilderStub = makeIdBuilder()
  const addUserStub = makeAddUser()
  const sut = new AddFakeUserUseCase(idBuilderStub, addUserStub)
  return { sut, idBuilderStub, addUserStub }
}

describe('AddFakeUserUseCase', () => {
  it('Should call IdBuilder', async () => {
    const { sut, idBuilderStub } = makeSut()
    const buildSpy = jest.spyOn(idBuilderStub, 'build')
    await sut.perform()
    expect(buildSpy).toHaveBeenCalled()
    expect(buildSpy).toHaveBeenCalledTimes(1)
  })

  it('Should throw if IdBuilder throws', async () => {
    const { sut, idBuilderStub } = makeSut()
    jest.spyOn(idBuilderStub, 'build').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddUser with correct values', async () => {
    const { sut, addUserStub } = makeSut()
    const performSpy = jest.spyOn(addUserStub, 'perform')
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789)
    await sut.perform()
    expect(performSpy).toHaveBeenCalledWith({
      externalAuthUserId: 'any_fake_user_id',
      firstName: 'first_name_123456',
      lastName: 'last_name_123456',
      email: 'email_123456@mail.com'
    })
  })
})
