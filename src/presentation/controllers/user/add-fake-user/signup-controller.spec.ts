import type { AddFakeUser } from '@/domain/contracts/user'
import { ok, serverError } from '@/presentation/helpers/http-helpers'
import { AddFakeUserController } from './signup-controller'

const makeAddFakeUser = (): AddFakeUser => {
  class AddFakeUserStub implements AddFakeUser {
    async perform (): Promise<{ token: string }> {
      return await Promise.resolve({ token: 'any_token' })
    }
  }
  return new AddFakeUserStub()
}

type SutTypes = {
  sut: AddFakeUserController
  addFakeUserStub: AddFakeUser
}

const makeSut = (): SutTypes => {
  const addFakeUserStub = makeAddFakeUser()
  const sut = new AddFakeUserController(addFakeUserStub)
  return { sut, addFakeUserStub }
}

describe('AddFakeUserController', () => {
  it('Should call AddFakeUser with correct values', async () => {
    const { sut, addFakeUserStub } = makeSut()
    const performSpy = jest.spyOn(addFakeUserStub, 'perform')
    await sut.handle({})
    expect(performSpy).toHaveBeenCalled()
  })

  it('Should return 500 if AddFakeUser throws', async () => {
    const { sut, addFakeUserStub } = makeSut()
    jest.spyOn(addFakeUserStub, 'perform').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok({ token: 'any_token' }))
  })
})
