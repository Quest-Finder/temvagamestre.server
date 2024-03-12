import type { AddUserData } from '@/domain/contracts/user'
import type { ExternalAuthMappingModel, UserModel } from '@/domain/models'
import type { AddUserRepo, FindUserByEmailRepo } from '@/usecases/contracts/db/user'
import type { IdBuilder } from '@/usecases/contracts/id'
import type { AddExternalAuthMappingRepo } from '@/usecases/contracts/db/external-auth-mapping'
import { AddUserUseCase } from './add-user-usecase'
import { EmailInUseError } from '@/domain/errors'

const makeFakeAddUserData = (): AddUserData => ({
  externalAuthUserId: 'any_external_auth_user_id',
  name: 'John Doe',
  email: 'any_email@mail.com'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe'
})

const makeFakeExternalAuthMappingModel = (): ExternalAuthMappingModel => ({
  userId: 'any_user_id',
  externalAuthUserId: 'any_external_auth_user_id'
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
    build (): string { return 'any_user_id' }
  }
  return new IdBuilderStub()
}

const makeAddUserRepo = (): AddUserRepo => {
  class AddUserRepoStub implements AddUserRepo {
    async execute (data: UserModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddUserRepoStub()
}

const makeAddExternalAuthMappingRepo = (): AddExternalAuthMappingRepo => {
  class AddExternalAuthMappingRepoStub implements AddExternalAuthMappingRepo {
    async execute (data: ExternalAuthMappingModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddExternalAuthMappingRepoStub()
}

type SutTypes = {
  sut: AddUserUseCase
  findUserByEmailRepoStub: FindUserByEmailRepo
  idBuilderStub: IdBuilder
  addUserRepoStub: AddUserRepo
  addExternalAuthMappingRepoStub: AddExternalAuthMappingRepo
}

const makeSut = (): SutTypes => {
  const findUserByEmailRepoStub = makeFindUserByEmailRepo()
  const idBuilderStub = makeIdBuilder()
  const addUserRepoStub = makeAddUserRepo()
  const addExternalAuthMappingRepoStub = makeAddExternalAuthMappingRepo()
  const sut = new AddUserUseCase(
    findUserByEmailRepoStub,
    idBuilderStub,
    addUserRepoStub,
    addExternalAuthMappingRepoStub
  )
  return {
    sut,
    findUserByEmailRepoStub,
    idBuilderStub,
    addUserRepoStub,
    addExternalAuthMappingRepoStub
  }
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

  it('Should call AddUserRepo with correct values', async () => {
    const { sut, addUserRepoStub } = makeSut()
    const executeSpy = jest.spyOn(addUserRepoStub, 'execute')
    await sut.perform(makeFakeAddUserData())
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith(makeFakeUserModel())
  })

  it('Should throw if AddUserRepo throws', async () => {
    const { sut, addUserRepoStub } = makeSut()
    jest.spyOn(addUserRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeAddUserData())
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddExternalAuthMappingRepo with correct values', async () => {
    const { sut, addExternalAuthMappingRepoStub } = makeSut()
    const executeSpy = jest.spyOn(addExternalAuthMappingRepoStub, 'execute')
    await sut.perform(makeFakeAddUserData())
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith(makeFakeExternalAuthMappingModel())
  })

  it('Should throw if AddExternalAuthMappingRepo throws', async () => {
    const { sut, addExternalAuthMappingRepoStub } = makeSut()
    jest.spyOn(addExternalAuthMappingRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeAddUserData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform(makeFakeAddUserData())
    expect(result.isRight()).toBe(true)
  })
})
