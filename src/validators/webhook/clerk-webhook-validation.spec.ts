import type { HttpRequest } from '@/presentation/types/http'
import { Webhook } from 'svix'
import { InvalidSvixError } from '../errors/invalid-svix-headers-error'
import { ClerkWebhookValidation } from './clerk-webhook-validation'

jest.mock('svix', () => ({
  Webhook: jest.fn(() => ({
    verify: jest.fn(() => true)
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

const makeSut = (): ClerkWebhookValidation => {
  return new ClerkWebhookValidation()
}
describe('ClerkWebhookValidation', () => {
  it('Should return InvalidSvixError if any field required not exist', async () => {
    const sut = makeSut()
    const result = await sut.validate({})
    expect(result.value).toEqual(new InvalidSvixError())
  })

  it('Should call Svix Webhook with correct secret', async () => {
    const sut = makeSut()
    await sut.validate(makeFakeRequest())
    expect(Webhook).toHaveBeenCalledWith('any_secret')
  })

  it('Should return right resutl if Svix Webhook verify is a success', async () => {
    const sut = makeSut()
    const result = await sut.validate(makeFakeRequest())
    expect(result.isRight()).toBe(true)
  })
})
