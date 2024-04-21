import type { AddUser, AddUserData, AddUserResponse } from '@/domain/contracts/user'
import { AddFakeUserUseCase } from './add-fake-user-usecase'
import { right } from '@/shared/either'
import { type IdBuilder } from '@/usecases/contracts/id'
import { type Encrypter } from '@/usecases/contracts/cryptography/encrypter'

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): string { return 'any_fake_user_id' }
  }
  return new IdBuilderStub()
}

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async perform (account: AddUserData): Promise<AddUserResponse> {
      return await Promise.resolve(right())
    }
  }
  return new AddUserStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    execute (value: string): { token: string } {
      return { token: 'any_token' }
    }
  }
  return new EncrypterStub()
}

type SutTypes = {
  sut: AddFakeUserUseCase
  idBuilderStub: IdBuilder
  addUserStub: AddUser
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const idBuilderStub = makeIdBuilder()
  const addUserStub = makeAddUser()
  const encrypterStub = makeEncrypter()
  const sut = new AddFakeUserUseCase(idBuilderStub, addUserStub, encrypterStub)
  return { sut, idBuilderStub, addUserStub, encrypterStub }
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
      name: 'last_name_1234 first_name_1234',
      email: 'email_1234@mail.com'
    })
  })

  it('Should throw if AddUser throws', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'perform').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const executeSpy = jest.spyOn(encrypterStub, 'execute')
    await sut.perform()
    expect(executeSpy).toHaveBeenCalledWith('any_fake_user_id')
  })

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'execute').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should return an token on success', async () => {
    const { sut } = makeSut()
    const token = await sut.perform()
    expect(token).toEqual({ token: 'any_token' })
  })
})
