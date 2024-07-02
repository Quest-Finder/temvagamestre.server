import { LogErrorMongoRepo } from '@/infra/database/mongodb/data/log-error/log-error-mongo-repository'
import { type LogErrorRepo } from '@/usecases/contracts/db/log-error/log-error-repo'

export const makeLogErrorMongoRepo = (): LogErrorRepo => {
  return new LogErrorMongoRepo()
}
