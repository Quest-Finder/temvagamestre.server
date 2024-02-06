import env from '@/main/configs/env'
import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  afterEach(async () => { await sut.disconnect() })

  it('Should reconnect if MongoDB is down', async () => {
    await sut.connect(env.mongoDbUri)

    let accountCollection = await sut.getCollection('any_collection')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()

    accountCollection = await sut.getCollection('any_collection')
    expect(accountCollection).toBeTruthy()
  })
})
