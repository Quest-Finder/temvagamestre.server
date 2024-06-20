import { type Collection } from 'mongodb'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { LogErrorMongoRepo } from './log-error-mongo-repository'
import env from '@/configs/env'
import { type LogErrorModel } from '@/models'

const makeFakeLogErrorModel = (): LogErrorModel => ({
  stack: 'any_stack',
  date: new Date()
})

let logErrorCollection: Collection

describe('LogErrorMongo Repo', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoDbUri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    logErrorCollection = await MongoHelper.getCollection('error')
    await logErrorCollection.deleteMany({})
  })

  it('Should add an Error log on success', async () => {
    const sut = new LogErrorMongoRepo()
    const countWithoutError = await logErrorCollection.countDocuments()
    await sut.execute(makeFakeLogErrorModel())
    const countWithError = await logErrorCollection.countDocuments()
    expect(countWithoutError).toBe(0)
    expect(countWithError).toBe(1)
  })
})
