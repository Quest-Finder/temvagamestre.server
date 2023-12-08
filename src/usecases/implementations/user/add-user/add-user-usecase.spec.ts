import type { AddUserData } from '@/domain/contracts/user'
import type { UserModel } from '@/domain/models'
import type { FindUserByEmailRepo } from '@/usecases/contracts/db/user'
import type { IdBuilder } from '@/usecases/contracts/id'
import { AddUserUseCase } from './add-user-usecase'
import { EmailInUseError } from '@/domain/errors'

const makeFakeAddUserData = (): AddUserData => ({
  firstName: 'any_first_name',
  lastName: 'any_last_name',
  email: 'any_email@mail.com',
  dateOfBirth: new Date()
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_id',
  firstName: 'any_first_name',
  lastName: 'any_last_name',
  email: 'any_email@mail.com',
  nickName: 'any_nick_name',
  phone: 'any_phone',
  adressId: 'any_adress_id',
  dateOfBirth: new Date()
})

const makeFindUserByEmailRepo = (): FindUserByEmailRepo => {
  class FindUserByEmailRepoStub implements FindUserByEmailRepo {
    async execute (email: string): Promise<null | UserModel> {
      return await Promise.resolve(null)
    }
  }
  return new FindUserByEmailRepoStub()
}

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): string { return 'any_id' }
  }
  return new IdBuilderStub()
}

interface SutTypes {
  sut: AddUserUseCase
  findUserByEmailRepoStub: FindUserByEmailRepo
  idBuilderStub: IdBuilder
}

const makeSut = (): SutTypes => {
  const findUserByEmailRepoStub = makeFindUserByEmailRepo()
  const idBuilderStub = makeIdBuilder()
  const sut = new AddUserUseCase(findUserByEmailRepoStub, idBuilderStub)
  return { sut, findUserByEmailRepoStub, idBuilderStub }
}

describe('AddUserUseCase', () => {
  it('Should call FindUserByEmailRepo with correct email', async () => {
    const { sut, findUserByEmailRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findUserByEmailRepoStub, 'execute')
    await sut.perform(makeFakeAddUserData())
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('Should return EmailInUseError if FindUserByEmailRepo returns an UserModel', async () => {
    const { sut, findUserByEmailRepoStub } = makeSut()
    jest.spyOn(findUserByEmailRepoStub, 'execute').mockReturnValueOnce(
      Promise.resolve(makeFakeUserModel())
    )
    const result = await sut.perform(makeFakeAddUserData())
    expect(result.value).toEqual(new EmailInUseError('any_email@mail.com'))
  })

  it('Should throw if FindUserByEmailRepo throws', async () => {
    const { sut, findUserByEmailRepoStub } = makeSut()
    jest.spyOn(findUserByEmailRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeAddUserData())
    await expect(promise).rejects.toThrow()
  })

  it('Should call IdBuilder', async () => {
    const { sut, idBuilderStub } = makeSut()
    const buildSpy = jest.spyOn(idBuilderStub, 'build')
    await sut.perform(makeFakeAddUserData())
    expect(buildSpy).toHaveBeenCalled()
    expect(buildSpy).toHaveBeenCalledTimes(1)
  })

  it('Should throw if IdBuilder throws', async () => {
    const { sut, idBuilderStub } = makeSut()
    jest.spyOn(idBuilderStub, 'build').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.perform(makeFakeAddUserData())
    await expect(promise).rejects.toThrow()
  })
})
