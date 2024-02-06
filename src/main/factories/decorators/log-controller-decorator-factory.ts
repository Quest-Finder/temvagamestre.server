import { type Controller } from '@/presentation/contracts'
import { LogControllerDecorator } from '@/presentation/decorators'
import { makeLogErrorMongoRepo } from '../infra/db/mongodb/log-error-mongo-repo-factory'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  return new LogControllerDecorator(controller, makeLogErrorMongoRepo())
}
