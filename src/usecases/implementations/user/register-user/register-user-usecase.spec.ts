import { User } from '@/domain/entities/user/user'
import { left, right } from '@/shared/either'
import { RegisterUserUseCase } from './register-user-usecase'
import { type RegisterUserData } from '@/domain/entities/user'

jest.mock('@/util/format-date-string-to-date-time/format-date-string-to-date-time', () => ({
  ...jest.requireActual('@/util/format-date-string-to-date-time/format-date-string-to-date-time'),
  formatDateStringToDateTime: jest.fn().mockReturnValue(
    new Date('2000-12-31T00:00:00')
  )
}))

jest.mock('@/domain/entities/user/user', () => ({
  User: {
    register: jest.fn((data: RegisterUserData) => {
      return right(data)
    })
  }
}))

const makeFakeRegisterUserData = (): RegisterUserData => ({
  id: 'any_id',
  name: 'John Doe',
  username: 'john-doe',
  pronoun: 'he/his',
  dateOfBirth: '12-31-2000'
})

type SutTypes = {
  sut: RegisterUserUseCase
}

const makeSut = (): SutTypes => {
  const sut = new RegisterUserUseCase()
  return { sut }
}

describe('RegisterUserUseCase', () => {
  it('Should call User.register() with correct values', async () => {
    const { sut } = makeSut()
    const registerSpy = jest.spyOn(User, 'register')
    await sut.perform(makeFakeRegisterUserData())
    expect(registerSpy).toHaveBeenCalledWith(makeFakeRegisterUserData())
  })

  it('Should return the same Error if User.register() returns an Error', async () => {
    const { sut } = makeSut()
    jest.spyOn(User, 'register').mockReturnValueOnce(
      left(new Error('any_error'))
    )
    const result = await sut.perform(makeFakeRegisterUserData())
    expect(result.value).toEqual(new Error('any_error'))
  })
})
