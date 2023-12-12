import type { Controller } from '@/presentation/contracts'
import type { HttpRequest } from '@/presentation/types/http'
import type { Response, Request, NextFunction } from 'express'

export class NestMiddlewareAdapter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response, next: NextFunction): Promise<void> {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params
    }
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        name: httpResponse.body.name,
        error: httpResponse.body.message,
        statusCode: httpResponse.statusCode
      })
    }
  }
}
