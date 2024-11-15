/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type NextFunction, type Request, type Response } from 'express'
import { Webhook } from 'svix'
import { WebhookAuthMiddleware } from './webhook-auth.middleware'
type FakeRequest = Request & {
  headers: {
    'svix-id': string
    'svix-timestamp': string
    'svix-signature': string
  }
  body: any
}
type SutType = {
  sut: WebhookAuthMiddleware
}

jest.mock('svix', () => ({
  Webhook: jest.fn().mockImplementation(() => ({
    verify: jest.fn()
  }))
}))

const fakeNextFunction = (): NextFunction => {
  return () => {}
}

const fakeResponse = (): Response => {
  return {} as Response
}

const makeSut = (): SutType => {
  const sut = new WebhookAuthMiddleware()
  return {
    sut
  }
}

describe('WebhookAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new WebhookAuthMiddleware()).toBeDefined()
  })

  it('Should return bad request if svix headers not exits', () => {
    try {
      const { sut } = makeSut()
      const request = {} as FakeRequest
      sut.use(request, fakeResponse(), fakeNextFunction())
    } catch (error: any) {
      expect(error.message).toEqual('Webhook auth data fails')
    }
  })

  it('Should return bad request if wh fails', () => {
    const wh = Webhook as jest.MockedFunction<any>
    wh.mockImplementation(() => ({
      verify: jest.fn(() => {
        throw new Error('Verification failed')
      })
    }))
    try {
      const { sut } = makeSut()
      const request = {
        headers: {
          'svix-id': 'any_svix_id',
          'svix-timestamp': 'any_svix_timestamp',
          'svix-signature': 'any_svix_signature'
        },
        body: { payload: 'any_payload' }
      } as FakeRequest

      sut.use(request, fakeResponse(), fakeNextFunction())
    } catch (error: any) {
      expect(error.message).toEqual('Failed to verify webhook')
    }
  })

  it('should return void', () => {
    const wh = Webhook as jest.MockedFunction<any>
    wh.mockImplementation(() => ({
      verify: jest.fn(() => {
        return {

        }
      })
    }))
    const { sut } = makeSut()
    const request = {
      headers: {
        'svix-id': 'any_svix_id',
        'svix-timestamp': 'any_svix_timestamp',
        'svix-signature': 'any_svix_signature'
      },
      body: {
        data: {
          id: 'clerk_id',
          first_name: 'Jonh',
          last_name: 'doe',
          email_addresses: 'valid@email.com'
        }
      }
    } as FakeRequest

    sut.use(request, fakeResponse(), fakeNextFunction())
    expect(sut).toBeTruthy()
  })
})
