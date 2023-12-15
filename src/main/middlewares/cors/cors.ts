import type { NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

export class CorsMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: NextFunction): void {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-methods', '*')
    res.set('access-control-allow-headers', '*')
    next()
  }
}
