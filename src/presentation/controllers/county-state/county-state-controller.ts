import { type GetCountyState } from '@/domain/contracts/county-state/get-county-state'
import { type Validation } from '@/presentation/contracts'
import { type Controller } from '@/presentation/contracts/controller'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export class CountyStateController implements Controller {
  constructor (private readonly getCountyState: GetCountyState, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }

      const { uf, county } = httpRequest.body
      const countyStateResult = await this.getCountyState.perform(uf, county)
      if (countyStateResult.isLeft()) {
        console.log(uf, county)
        return badRequest(countyStateResult.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
