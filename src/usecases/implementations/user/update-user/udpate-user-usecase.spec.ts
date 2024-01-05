import { type UpdateUserData } from '@/domain/contracts/user'
import { UpdateUserUseCase } from './udpate-user-usecase'
import { formatDateStringToDateTime } from '@/util'

jest.mock('@/util/format-date-string-to-date-time/format-date-string-to-date-time', () => ({
  ...jest.requireActual('@/util/format-date-string-to-date-time/format-date-string-to-date-time'),
  formatDateStringToDateTime: jest.fn()
}))

const makeFakeUpdateUserData = (): UpdateUserData => ({
  firstName: 'any_first_name',
  lastName: 'any_last_name',
  phone: 'any_phone',
  dateOfBirth: '12-31-2000',
  nickname: 'any_nickname'
})

type SutTypes = {
  sut: UpdateUserUseCase
}

const makeSut = (): SutTypes => {
  const sut = new UpdateUserUseCase()
  return { sut }
}

describe('UpdateUserUseCase', () => {
  it('Should call formatDateStringToDateTime() with dateOfBirth', async () => {
    const { sut } = makeSut()
    await sut.perform(makeFakeUpdateUserData())
    expect(formatDateStringToDateTime).toHaveBeenCalledWith('12-31-2000')
  })
})
