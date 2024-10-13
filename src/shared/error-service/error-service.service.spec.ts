import env from '@/configs/env'
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose'
import { Test, type TestingModule } from '@nestjs/testing'
import { type Connection } from 'mongoose'
import { ErrorService } from './error-service.service'
import { ErrorLog, ErrorLogSchema } from './error.schema'

describe('ErrorService', () => {
  let service: ErrorService
  let connection: Connection
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorService],
      imports: [
        MongooseModule.forRoot(env.mongoDbUri),
        MongooseModule.forFeature([{ name: ErrorLog.name, schema: ErrorLogSchema }])
      ]
    }).compile()

    service = module.get<ErrorService>(ErrorService)
    connection = await module.get(getConnectionToken())
  })

  afterAll(async () => {
    await connection.close(true)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
