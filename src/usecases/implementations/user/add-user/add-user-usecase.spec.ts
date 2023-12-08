import type { AddUserData } from '@/domain/contracts/user'
import type { UserModel } from '@/domain/models'
import type { FindUserByEmailRepo } from '@/usecases/contracts/db/user'
import { AddUserUseCase } from './add-user-usecase'
import { EmailInUseError } from '@/domain/errors'

const makeFakeAddUserData = (): AddUserData => ({
  firstName: 'any_first_name',
  lastName: 'any_last_name',
  email: 'any_email@mail.com',
  dateOfBirth: new Date()
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_id',
  firstName: 'any_first_name',
  lastName: 'any_last_name',
  email: 'any_email@mail.com',
  nickName: 'any_nick_name',
  phone: 'any_phone',
  adressId: 'any_adress_id',
  dateOfBirth: new Date()
})

const makeFindUserByEmailRepo = (): FindUserByEmailRepo => {
  class FindUserByEmailRepoStub implements FindUserByEmailRepo {
    async execute (email: string): Promise<null | UserModel> {
      return await Promise.resolve(null)
    }
  }
  return new FindUserByEmailRepoStub()
}

interface SutTypes {
  sut: AddUserUseCase
  findUserByEmailRepoStub: FindUserByEmailRepo
}

const makeSut = (): SutTypes => {
  const findUserByEmailRepoStub = makeFindUserByEmailRepo()
  const sut = new AddUserUseCase(findUserByEmailRepoStub)
  return { sut, findUserByEmailRepoStub }
}

describe('AddUserUseCase', () => {
  it('Should call FindUserByEmailRepo with correct email', async () => {
    const { sut, findUserByEmailRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findUserByEmailRepoStub, 'execute')
    await sut.perform(makeFakeAddUserData())
    expect(executeSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('Should return EmailInUseError if FindUserByEmailRepo returns an UserModel', async () => {
    const { sut, findUserByEmailRepoStub } = makeSut()
    jest.spyOn(findUserByEmailRepoStub, 'execute').mockReturnValueOnce(
      Promise.resolve(makeFakeUserModel())
    )
    const result = await sut.perform(makeFakeAddUserData())
    expect(result.value).toEqual(new EmailInUseError('any_email@mail.com'))
  })
})
