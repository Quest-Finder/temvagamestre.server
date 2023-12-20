import jwt from 'jsonwebtoken'
import { JwtVerifyAdapter } from './jwt-verify-adapter'

jest.mock('jsonwebtoken', () => ({
  verify (): any {
    return { clerkUserId: 'any_user_id' }
  }
}))

class JwtErrorMock extends Error {
  constructor (name: string) {
    super('Error Mock')
    this.name = name
  }
}

const makeSut = (): JwtVerifyAdapter => {
  return new JwtVerifyAdapter('any_secret')
}

describe('JwtVerifyAdapter', () => {
  it('Should call verify with correct values', async () => {
    const sut = makeSut()
    const verifySpy = jest.spyOn(jwt, 'verify')
    await sut.execute('any_token')
    expect(verifySpy).toHaveBeenCalledWith('any_token', 'any_secret')
  })

  it('Should return null if clerkUserId not provided in payload', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => ({
      otherValue: 'any_other_value'
    }))
    const result = await sut.execute('any_token')
    expect(result).toBe(null)
  })

  it('Should throw if verify throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.execute('any_token')
    await expect(promise).rejects.toThrow()
  })

  it('Should return null if jwt throws an error JsonWebTokenError', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new JwtErrorMock('JsonWebTokenError')
    })
    const executeResult = await sut.execute('any_token')
    expect(executeResult).toBeNull()
  })

  it('Should return null if jwt throws an error NotBeforeError', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new JwtErrorMock('NotBeforeError')
    })
    const executeResult = await sut.execute('any_token')
    expect(executeResult).toBeNull()
  })

  it('Should return null if jwt throws an error TokenExpiredError', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new JwtErrorMock('TokenExpiredError')
    })
    const executeResult = await sut.execute('any_token')
    expect(executeResult).toBeNull()
  })

  it('Should return null if jwt throws an error SyntaxError', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new JwtErrorMock('SyntaxError')
    })
    const executeResult = await sut.execute('any_token')
    expect(executeResult).toBeNull()
  })

  it('Should return an user id on success', async () => {
    const sut = makeSut()
    const executeedValue = await sut.execute('any_token')
    expect(executeedValue).toBe('any_user_id')
  })
})
