import { NestRouteAdapter } from '@/main/adapters/nest-route-adapter'
import { type Controller } from '@/presentation/contracts/controller'

export const adaptRoute = (controller: Controller): NestRouteAdapter => {
  return new NestRouteAdapter(controller)
}
