import type { Controller } from '@/presentation/contracts'
import { type HttpRequest } from '@/presentation/types/http'
import type { Response, Request } from 'express'

export class NestRouteAdapter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params
    }
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        name: httpResponse.body.name,
        error: httpResponse.body.message,
        statusCode: httpResponse.statusCode
      })
    }
  }
}
