import { type CheckUsername } from '@/domain/contracts/user/check-username'
import { type UserModel } from '@/domain/models'
import { type FindUserByUsernameRepo } from '@/usecases/contracts/db/user/find-user-by-username-repo'
import { CheckUsernameUseCase } from './check-username-use-case'

type MakeSut = {
  sut: CheckUsername
  findUserByUsernameRepo: FindUserByUsernameRepo
}

class FindUserByUsernameRepoStub implements FindUserByUsernameRepo {
  async execute (username: string): Promise<UserModel | null> {
    return null
  }
}

const makeSut = (): MakeSut => {
  const findUserByUsernameRepo = new FindUserByUsernameRepoStub()
  const sut = new CheckUsernameUseCase(findUserByUsernameRepo)
  return {
    sut,
    findUserByUsernameRepo
  }
}

describe('CheckUsernameUseCase', () => {
  it('should throw if username alread exits', async () => {
    const { sut, findUserByUsernameRepo } = makeSut()
    jest.spyOn(findUserByUsernameRepo, 'execute').mockResolvedValueOnce({
      email: 'valid_email@email.com',
      id: 'valid_id',
      name: 'Jonh Doe',
      username: 'exists_username'
    })
    const response = await sut.perform('exists_username')
    expect(response.isLeft()).toBe(true)
  })
})
