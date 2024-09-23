import { type CheckUserById } from '@/contracts/user/check-by-id'
import { type UserModel } from '@/models'
import { type FindUserByEmailRepo } from '@/usecases/contracts/db/user'
import { CheckUserByIdUseCase } from './check-user-by-id-user-case'

type MakeSut = {
  sut: CheckUserById
  repository: FindUserByEmailRepo
}

const makeFakeRepository = (): FindUserByEmailRepo => {
  class FakeFindUserByEmailRepo implements FindUserByEmailRepo {
    async execute (id: string): Promise<UserModel | null > {
      return await Promise.resolve({ id: 'valid_id', name: 'John Doe', email: 'valid@email.com' })
    }
  }
  return new FakeFindUserByEmailRepo()
}

const makeSut = (): MakeSut => {
  const repository = makeFakeRepository()
  const sut = new CheckUserByIdUseCase(repository)
  return {
    sut,
    repository
  }
}

describe('CheckUserById UseCase', () => {
  it('should call repository with correct values', async () => {
    const { sut, repository } = makeSut()
    const repositoryStub = jest.spyOn(repository, 'execute')
    await sut.perform('valid')
    expect(repositoryStub).toHaveBeenCalledTimes(1)
  })

  it('should return a error if user does not exits', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'execute').mockResolvedValueOnce(null)
    const result = await sut.perform('invalid')
    expect(result.value).toEqual(new Error('User not found'))
  })

  it('should return a user if exits', async () => {
    const { sut } = makeSut()
    const result = await sut.perform('valid')
    expect(result.value).toEqual(expect.objectContaining({ id: 'valid_id', name: 'John Doe', email: 'valid@email.com' }))
  })
})
