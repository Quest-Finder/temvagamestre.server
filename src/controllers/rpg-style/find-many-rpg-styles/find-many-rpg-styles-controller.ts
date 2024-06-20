import { type FindManyRpgStyles } from '@/contracts/rpg-style'
import { type Controller } from '@/contracts'
import { ok, serverError } from '@/helpers/http/http-helpers'
import { type HttpResponse } from '@/types/http'

export class FindManyRpgStylesController implements Controller {
  constructor (private readonly findManyRpgStyles: FindManyRpgStyles) {}

  async handle (): Promise<HttpResponse> {
    try {
      const findManyRpgStylesResult = await this.findManyRpgStyles.perform()
      return ok(findManyRpgStylesResult)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
