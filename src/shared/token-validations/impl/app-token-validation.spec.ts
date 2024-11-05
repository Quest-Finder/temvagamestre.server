import jwt from 'jsonwebtoken'
import { AppTokenValidation } from './app-token-validation'
type MakeSutType = {
  sut: AppTokenValidation
  jwtSpy: jest.SpyInstance

}

const makeSut = (): MakeSutType => {
  const jwtSpy = jest.spyOn(jwt, 'verify' as any)
  const sut = new AppTokenValidation()
  return {
    sut,
    jwtSpy
  }
}

describe('AppTokenValidation', () => {
  it('should return payload when token is valid', async () => {
    const { sut, jwtSpy } = makeSut()
    jwtSpy.mockReturnValue({
      payload: {
        userId: 'valid-user-id',
        email: 'user@email.com'
      }
    })
    const response = sut.verify('valid-token')
    expect(response).toEqual(expect.objectContaining({
      externalUserId: 'valid-user-id',
      email: 'user@email.com'
    }))
  })

  it('should return undefine if token is invalid', () => {
    const { sut, jwtSpy } = makeSut()
    jwtSpy.mockImplementation(() => {
      throw new Error()
    })
    const response = sut.verify('valid-token')
    expect(response).not.toBeTruthy()
  })
})
