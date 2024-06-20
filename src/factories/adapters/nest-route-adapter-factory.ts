import { NestRouteAdapter } from '@/adapters/nest-route-adapter'
import { type Controller } from '@/contracts/controller'

export const adaptRoute = (controller: Controller): NestRouteAdapter => {
  return new NestRouteAdapter(controller)
}
