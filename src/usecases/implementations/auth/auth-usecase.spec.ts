import { InvalidTokenError } from '@/domain/errors'
import type { Decrypter } from '@/usecases/contracts/cryptography/decrypter'
import { AuthUseCase } from './auth-usecase'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async execute (token: string): Promise<null | string> {
      return await Promise.resolve('any_id')
    }
  }
  return new DecrypterStub()
}

interface SutTypes {
  sut: AuthUseCase
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new AuthUseCase(decrypterStub)
  return { sut, decrypterStub }
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
})
