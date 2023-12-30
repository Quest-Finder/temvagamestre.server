import { type UserModel } from '@/domain/models'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'
import { UpdateUserConfigsUseCase } from './update-user-configs-usecase'
import { PhoneNotCreatedError } from '@/domain/errors'

describe('UpdateUserConfigsUseCase', () => {
  it('Should call FindUserByIdRepo with correct user id', async () => {
    class FindUserByIdRepoStub implements FindUserByIdRepo {
      async execute (id: string): Promise<UserModel | null> {
        return {
          id: 'any_user_id',
          email: 'any_email@mail.com',
          firstName: 'any_first_name',
          lastName: 'any_last_name',
          phone: 'any_phone'
        }
      }
    }
    const findUserByIdRepoStub = new FindUserByIdRepoStub()
    const executeSpy = jest.spyOn(findUserByIdRepoStub, 'execute')
    const sut = new UpdateUserConfigsUseCase(findUserByIdRepoStub)
    await sut.perform({
      userId: 'any_user_id',
      allowMessage: true
    })
    expect(executeSpy).toHaveBeenCalledWith('any_user_id')
    expect(executeSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return PhoneNotCreatedError if user phone does not exist', async () => {
    class FindUserByIdRepoStub implements FindUserByIdRepo {
      async execute (id: string): Promise<UserModel | null> {
        return {
          id: 'any_user_id',
          email: 'any_email@mail.com',
          firstName: 'any_first_name',
          lastName: 'any_last_name'
        }
      }
    }
    const findUserByIdRepoStub = new FindUserByIdRepoStub()
    const sut = new UpdateUserConfigsUseCase(findUserByIdRepoStub)
    const result = await sut.perform({
      userId: 'any_user_id',
      allowMessage: true
    })
    expect(result.value).toEqual(new PhoneNotCreatedError())
  })
})
