import { type Controller } from '@/contracts'
import { LogControllerDecorator } from '@/decorators'
import { makeLogErrorMongoRepo } from '../infra/db/mongodb/log-error-mongo-repo-factory'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  return new LogControllerDecorator(controller, makeLogErrorMongoRepo())
}
