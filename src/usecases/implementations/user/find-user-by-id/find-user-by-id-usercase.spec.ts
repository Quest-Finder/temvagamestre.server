import { type FindUserById } from '@/domain/contracts/user'
import { FindUserByIdUseCase } from './find-user-by-id-usecase'

type MakeSutType = {
  sut: FindUserById
}

const makeSut = (): MakeSutType => {
  const sut: FindUserById = new FindUserByIdUseCase()

  return {
    sut
  }
}

describe('FindUserByIdUserCase', () => {
  it('should call FindUserByIdUserCase with correct values', async () => {
    const { sut } = makeSut()
    const sutSpy = jest.spyOn(sut, 'perform')
    await sut.perform({ userId: 'valid_id' })
    expect(sutSpy).toHaveBeenCalledWith({ userId: 'valid_id' })
  })
})
