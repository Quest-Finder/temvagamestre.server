import { type FindManyRpgStyles } from '@/domain/contracts/rpg-style'
import { type Controller } from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpResponse } from '@/presentation/types/http'

export class FindManyRpgStylesController implements Controller {
  constructor (private readonly findManyRpgStyles: FindManyRpgStyles) {}

  async handle (): Promise<HttpResponse> {
    try {
      const findManyRpgStylesResult = await this.findManyRpgStyles.perform()
      return ok(findManyRpgStylesResult.value)
    } catch (error) {
      return serverError()
    }
  }
}
