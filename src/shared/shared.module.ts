import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { IbgeService } from './integration/ibge/ibge.service'

@Module({
  imports: [HttpModule],
  providers: [IbgeService]
})
export class SharedModule {}
