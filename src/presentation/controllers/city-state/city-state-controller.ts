import { type GetCityState } from '@/domain/contracts/county-state/get-county-state'
import { type Validation } from '@/presentation/contracts'
import { type Controller } from '@/presentation/contracts/controller'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export class CityStateController implements Controller {
  constructor (private readonly getCityState: GetCityState, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }

      const { uf, county } = httpRequest.body
      const cityStateResult = await this.getCityState.perform(uf, county)
      if (cityStateResult.isLeft()) {
        return badRequest(cityStateResult.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
