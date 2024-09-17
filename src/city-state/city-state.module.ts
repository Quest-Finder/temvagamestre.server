import { IbgeService } from '@/shared/integration/ibge/ibge.service'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { CityStateController } from './city-state-controller/city-state.controller'
import { CityStateService } from './city-state.service'

@Module({
  controllers: [CityStateController],
  providers: [CityStateService, IbgeService],
  imports: [HttpModule]
})
export class CityStateModule {}
