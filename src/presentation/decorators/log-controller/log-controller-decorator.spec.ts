import type { Controller } from '@/presentation/contracts'
import { ok } from '@/presentation/helpers/http-helpers'
import type { HttpResponse, HttpRequest } from '@/presentation/types/http'
import { LogControllerDecorator } from './log-controller-decorator'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any name',
    email: 'any_email',
    password: 'password1234',
    passwordConfirmation: 'password1234'
  }
})

const makeFakeData = (): { value: string, data: string } => ({
  value: 'any_value',
  data: 'any_data'
})

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return { sut, controllerStub }
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await Promise.resolve(ok(makeFakeData()))
    }
  }
  return new ControllerStub()
}

describe('LogControllerDecorator', () => {
  it('Should call Controller with http request', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  it('Should return the same result of the Controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeData()))
  })
})
