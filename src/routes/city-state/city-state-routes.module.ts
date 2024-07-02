import { Module } from '@nestjs/common'
import { CityStateRoutes } from './city-state-routes'

@Module({
  controllers: [CityStateRoutes]
})
export class CityStateRoutesModule {}
