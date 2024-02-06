import { type LogErrorRepo } from '@/usecases/contracts/db/log-error/log-error-repo'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { type LogErrorModel } from '@/domain/models'

export class LogErrorMongoRepo implements LogErrorRepo {
  async execute ({ date, stack }: LogErrorModel): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('error')
    await errorCollection.insertOne({ stack, date })
  }
}
