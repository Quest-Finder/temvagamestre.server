import { Module } from '@nestjs/common'
import { CountyStateRoutes } from './county-state-routes'

@Module({
  controllers: [CountyStateRoutes]
})
export class CountyStateRoutesModule {}
