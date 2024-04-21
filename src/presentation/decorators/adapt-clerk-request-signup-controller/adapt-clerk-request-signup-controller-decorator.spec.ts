import type { HttpRequest, HttpResponse } from '@/presentation/types/http'
import type { Controller } from '@/presentation/contracts'
import { noContent } from '@/presentation/helpers/http-helpers'
import { AdaptClerkRequestSignUpControllerDecorator } from './adapt-clerk-request-signup-controller-decorator'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    data: {
      birthday: '',
      created_at: 1654012591514,
      email_addresses: [
        {
          email_address: 'example@example.org',
          id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
          linked_to: [],
          object: 'email_address',
          verification: {
            status: 'verified',
            strategy: 'ticket'
          }
        }
      ],
      external_accounts: [],
      external_id: '567772',
      first_name: 'any_first_name',
      gender: '',
      id: 'user_29w83sxmDNGwOuEthce5gg56FcC',
      last_name: 'any_last_name',
      locked: false,
      last_sign_in_at: 1654012591514,
      object: 'user',
      password_enabled: true,
      phone_numbers: [],
      primary_email_address_id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
      primary_phone_number_id: null,
      primary_web3_wallet_id: null,
      private_metadata: {},
      profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
      public_metadata: {},
      two_factor_enabled: false,
      unsafe_metadata: {},
      updated_at: 1654012591835,
      username: null,
      web3_wallets: []
    },
    object: 'event',
    type: 'user.created'
  }
})

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await Promise.resolve(noContent())
    }
  }
  return new ControllerStub()
}

type SutTypes = {
  sut: AdaptClerkRequestSignUpControllerDecorator
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new AdaptClerkRequestSignUpControllerDecorator(controllerStub)
  return { sut, controllerStub }
}

describe('AdaptExternalAuthRequestSignUpControllerDecorator', () => {
  it('Should call Controller with the formatted request body', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith({
      body: {
        externalAuthUserId: 'user_29w83sxmDNGwOuEthce5gg56FcC',
        name: 'any_first_name any_last_name',
        email: 'example@example.org'
      }
    })
  })

  it('Should return the same response as the Controller returns', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
