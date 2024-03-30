import { type FindUserById } from '@/domain/contracts/user'
import { UserNotExitsError } from '@/domain/errors'
import { type UserModel } from '@/domain/models'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'
import { FindUserByIdUseCase } from './find-user-by-id-usecase'
type MakeSutType = {
  sut: FindUserById
  findUserByIdRepo: FindUserByIdRepo
}

class FindUserByIdRepoStub implements FindUserByIdRepo {
  async execute (userId: string): Promise<UserModel | null> {
    return {
      id: 'valid_id',
      firstName: 'string',
      lastName: 'string',
      email: 'string'
    }
  }
}

const makeSut = (): MakeSutType => {
  const findUserByIdRepo = new FindUserByIdRepoStub()
  const sut = new FindUserByIdUseCase(findUserByIdRepo)
  return {
    sut, findUserByIdRepo
  }
}

describe('FindUserByIdUserCase', () => {
  it('should call FindUserByIdUserCase with correct values', async () => {
    const { sut } = makeSut()
    const sutSpy = jest.spyOn(sut, 'perform')
    await sut.perform({ userId: 'valid_id' })
    expect(sutSpy).toHaveBeenCalledWith({ userId: 'valid_id' })
  })

  it('should call FindUserByIdRepo with correct values', async () => {
    const { sut, findUserByIdRepo } = makeSut()
    const findUserByIdRepoSpy = jest.spyOn(findUserByIdRepo, 'execute')
    await sut.perform({ userId: 'valid_id' })
    expect(findUserByIdRepoSpy).toHaveBeenCalledWith('valid_id')
  })

  it('should return error if UserNotExitsError if FindUserByIdRepo return null', async () => {
    const { sut, findUserByIdRepo } = makeSut()
    jest.spyOn(findUserByIdRepo, 'execute').mockResolvedValueOnce(null)
    const result = await sut.perform({ userId: 'valid_id' })
    expect(result.value).toEqual(new UserNotExitsError('valid_id'))
  })

  it('should return user data if userId exits', async () => {
    const { sut } = makeSut()
    const result = await sut.perform({ userId: 'valid_id' })
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expect.objectContaining({
      id: 'valid_id',
      firstName: 'string',
      lastName: 'string',
      email: 'string'
    }))
  })
})
