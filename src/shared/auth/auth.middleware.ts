import env from '@/configs/env'
import { UserRepository } from '@/users/repository/user/user-repository'
import { Injectable, InternalServerErrorException, UnauthorizedException, type NestMiddleware } from '@nestjs/common'
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload extends jwt.JwtPayload {
  clerkUserId: string
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor (private readonly userService: UserRepository) {}

  async use (request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const accessToken = request.headers?.['x-access-token'] as string
      if (!accessToken) {
        throw new UnauthorizedException('Token not provided')
      }
      const payload = jwt.verify(accessToken, env.clerkJwtSecretKey) as TokenPayload
      if (!payload.clerkUserId) {
        throw new UnauthorizedException('Invalid token')
      }
      const user = await this.userService.findByExternalAuthId(payload.clerkUserId)
      if (!user) {
        throw new UnauthorizedException('User not found')
      }
      request.headers.userId = user.id
      next()
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token')
      }
      throw new InternalServerErrorException('Fail to authenticate user')
    }
  }
}
