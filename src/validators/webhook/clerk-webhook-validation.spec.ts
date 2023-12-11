import { InvalidSvixError } from '../errors/invalid-svix-headers'
import { ClerkWebhookValidation } from './clerk-webhook-validation'

// const makeFakeRequest = (): HttpRequest => ({
//   headers: {
//     'svix-id': 'any_svix_id',
//     'svix-timestamp': 'any_svix_timestamp',
//     'svix-signature': 'any_svix_signature'
//   },
//   body: { payload: 'any_payload' }
// })

const makeSut = (): ClerkWebhookValidation => {
  return new ClerkWebhookValidation()
}
describe('ClerkWebhookValidation', () => {
  it('Should return InvalidSvixError if any field required not exist', async () => {
    const sut = makeSut()
    const result = await sut.validate({})
    expect(result.value).toEqual(new InvalidSvixError())
  })
})
