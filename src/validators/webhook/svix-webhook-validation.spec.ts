import type { HttpRequest } from '@/presentation/types/http'
import { Webhook } from 'svix'
import { InvalidSvixError } from '../errors/invalid-svix-headers-error'
import { SvixWebhookValidation } from './svix-webhook-validation'
import { VerifyWebhookError } from '../errors'
import env from '@/main/configs/env'

jest.mock('svix', () => ({
  Webhook: jest.fn().mockImplementation(() => ({
    verify: jest.fn()
  }))
}))

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'svix-id': 'any_svix_id',
    'svix-timestamp': 'any_svix_timestamp',
    'svix-signature': 'any_svix_signature'
  },
  body: { payload: 'any_payload' }
})

const makeSut = (): SvixWebhookValidation => {
  return new SvixWebhookValidation()
}
describe('SvixWebhookValidation', () => {
  it('Should return InvalidSvixError if any field required not exist', () => {
    const sut = makeSut()
    const result = sut.validate({})
    expect(result.value).toEqual(new InvalidSvixError())
  })

  it('Should call Svix Webhook with correct secret', () => {
    const sut = makeSut()
    sut.validate(makeFakeRequest())
    expect(Webhook).toHaveBeenCalledWith(env.webhookSecret)
  })

  it('Should return right resutl if Svix Webhook verify is a success', () => {
    const sut = makeSut()
    const result = sut.validate(makeFakeRequest())
    expect(result.isRight()).toBe(true)
  })

  it('Should return VerifyWebhookError if Svix Webhook verify throws', () => {
    const sut = makeSut()
    const wh = Webhook as jest.MockedFunction<any>
    wh.mockImplementation(() => ({
      verify: jest.fn(() => {
        throw new Error('Verification failed')
      })
    }))
    const result = sut.validate(makeFakeRequest())
    expect(result.value).toEqual(new VerifyWebhookError())
  })
})
