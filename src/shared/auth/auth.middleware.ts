import { type TokenPayload, type TokenValidation } from '@/shared/token-validations/token-validation'
import { UserRepository } from '@/users/repository/user/user-repository'
import { Inject, Injectable, InternalServerErrorException, UnauthorizedException, type NestMiddleware } from '@nestjs/common'
import { type NextFunction, type Request, type Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor (
    private readonly userService: UserRepository,
    @Inject('TokenValidations') private readonly validations: TokenValidation[]) {

  }

  async use (request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const accessToken = request.headers?.['x-access-token'] as string
      if (!accessToken) {
        throw new UnauthorizedException('Token not provided')
      }
      let payload: TokenPayload | undefined
      for (const validation of this.validations) {
        payload = validation.verify(accessToken)
        if (payload) {
          break
        }
      }
      if (!payload) {
        throw new UnauthorizedException('Invalid token')
      }
      const user = await this.userService.findByExternalAuthId(payload.externalUserId)
      if (!user) {
        throw new UnauthorizedException('User not found')
      }
      request.headers.userId = user.id
      next()
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token')
      }
      throw new InternalServerErrorException('Fail to authenticate user')
    }
  }
}
