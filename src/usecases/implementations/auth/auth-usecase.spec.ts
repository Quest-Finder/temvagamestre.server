import { AccessDeniedError, InvalidTokenError } from '@/domain/errors'
import type { Decrypter } from '@/usecases/contracts/cryptography/decrypter'
import { AuthUseCase } from './auth-usecase'
import { type FindExternalAuthMappingByExternalAuthUserIdRepo } from '@/usecases/contracts/db/external-auth-mapping'
import { type ExternalAuthMappingModel } from '@/domain/models'

const makeFakeExternalAuthMappingModel = (): ExternalAuthMappingModel => ({
  userId: 'any_user_id',
  externalAuthUserId: 'any_external_auth_user_id'
})

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async execute (token: string): Promise<null | string> {
      return await Promise.resolve('any_external_auth_user_id')
    }
  }
  return new DecrypterStub()
}

const makeFindExternalAuthMappingByExternalAuthUserIdRepo = (): FindExternalAuthMappingByExternalAuthUserIdRepo => {
  class FindExternalAuthMappingByExternalAuthUserIdRepoStub implements FindExternalAuthMappingByExternalAuthUserIdRepo {
    async execute (externalAuthUserId: string): Promise<null | ExternalAuthMappingModel> {
      return await Promise.resolve(makeFakeExternalAuthMappingModel())
    }
  }
  return new FindExternalAuthMappingByExternalAuthUserIdRepoStub()
}

interface SutTypes {
  sut: AuthUseCase
  decrypterStub: Decrypter
  findExternalAuthMappingByExternalAuthUserIdRepoStub: FindExternalAuthMappingByExternalAuthUserIdRepo
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const findExternalAuthMappingByExternalAuthUserIdRepoStub = makeFindExternalAuthMappingByExternalAuthUserIdRepo()
  const sut = new AuthUseCase(decrypterStub, findExternalAuthMappingByExternalAuthUserIdRepoStub)
  return {
    sut,
    decrypterStub,
    findExternalAuthMappingByExternalAuthUserIdRepoStub
  }
}

describe('AuthUseCase', () => {
  it('Should call Decrypter with correct token', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'execute')
    await sut.perform('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  it('Should return InvalidTokenError if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'execute').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const result = await sut.perform('any_token')
    expect(result.value).toEqual(new InvalidTokenError())
  })

  it('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform('any_token')
    await expect(promise).rejects.toThrow()
  })

  it('Should call FindExternalAuthMappingByExternalAuthUserIdRepo with correct external auth user id', async () => {
    const { sut, findExternalAuthMappingByExternalAuthUserIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findExternalAuthMappingByExternalAuthUserIdRepoStub, 'execute')
    await sut.perform('any_token')
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith('any_external_auth_user_id')
  })

  it('Should return AccessDeniedError if FindExternalAuthMappingByExternalAuthUserIdRepo returns null', async () => {
    const { sut, findExternalAuthMappingByExternalAuthUserIdRepoStub } = makeSut()
    jest.spyOn(findExternalAuthMappingByExternalAuthUserIdRepoStub, 'execute').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const result = await sut.perform('any_token')
    expect(result.value).toEqual(new AccessDeniedError())
  })

  it('Should throw if FindExternalAuthMappingByExternalAuthUserIdRepo throws', async () => {
    const { sut, findExternalAuthMappingByExternalAuthUserIdRepoStub } = makeSut()
    jest.spyOn(findExternalAuthMappingByExternalAuthUserIdRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform('any_token')
    await expect(promise).rejects.toThrow()
  })

  it('Should return an user id on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform('any_token')
    expect(result.value).toEqual({ userId: 'any_user_id' })
  })
})
