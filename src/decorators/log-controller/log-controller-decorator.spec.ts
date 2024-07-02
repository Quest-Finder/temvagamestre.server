import type { LogErrorModel } from '@/models'
import type { Controller } from '@/contracts'
import { ok, serverError } from '@/helpers/http/http-helpers'
import type { HttpRequest, HttpResponse } from '@/types/http'
import type { LogErrorRepo } from '@/usecases/contracts/db/log-error/log-error-repo'
import MockDate from 'mockdate'
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

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await Promise.resolve(ok(makeFakeData()))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepo = (): LogErrorRepo => {
  class LogErrorRepoStub implements LogErrorRepo {
    async execute (data: LogErrorModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new LogErrorRepoStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepoStub: LogErrorRepo
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepoStub = makeLogErrorRepo()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepoStub)
  return { sut, controllerStub, logErrorRepoStub }
}

describe('LogControllerDecorator', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

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

  it('Should call LogErrorRepo with correct values if Controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepoStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      Promise.resolve(makeFakeServerError())
    )
    const executeSpy = jest.spyOn(logErrorRepoStub, 'execute')
    await sut.handle(makeFakeRequest())
    expect(executeSpy).toHaveBeenCalledWith({
      stack: 'any_stack',
      date: new Date()
    })
  })
})
