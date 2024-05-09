import { type ExternalRequestError } from '@/presentation/errors/external-request-error'
import { FetchRequestAdapter } from './fetch-request-adapter'

global.fetch = jest.fn()
const responseOK = { statusCode: 200, body: { teste: 'test success' } }
const responseError = { statusCode: 400, body: { teste: 'teste error' } }

const executeMock = jest.fn() as jest.Mock

describe('FetchRequestAdapter', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should be success', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: responseOK.statusCode,
      json: async () => await Promise.resolve(responseOK.body),
      statusText: 'OK'
    })

    executeMock.mockResolvedValueOnce(responseOK)
    const sut = new FetchRequestAdapter()
    const response = await sut.execute('https://localhost')
    expect(response).toEqual(responseOK)
  })

  it('should be Error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: responseError.statusCode,
      json: async () => await Promise.resolve(responseError.body),
      statusText: 'Erro Fetch'
    })

    try {
      const sut = new FetchRequestAdapter()
      await sut.execute('https://localhost')
    } catch (error) {
      const err = error as ExternalRequestError
      expect(err.statusCode).toBe(responseError.statusCode)
      expect(err.message).toBe('Erro Fetch')
    }
  })
})
