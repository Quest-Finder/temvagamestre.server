import { type Middleware } from '@/contracts'
import { type HttpRequest } from '@/types/http'
import type { NextFunction, Request, Response } from 'express'

export class NestMiddlewareAdapter {
  constructor (private readonly middleware: Middleware) {}

  async adapt (req: Request, res: Response, next: NextFunction): Promise<void> {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params
    }
    const httpResponse = await this.middleware.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      Object.assign(req.headers, httpResponse.body)
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
