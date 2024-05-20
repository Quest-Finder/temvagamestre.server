import { Module } from '@nestjs/common'
import { BadgeRoutesController } from './badge-routes'

@Module({
  controllers: [BadgeRoutesController]
})
export class BadgeModule { }
