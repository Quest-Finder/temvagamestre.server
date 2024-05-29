import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { AppModule } from '@/main/app.module'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { type Badge, type PrismaClient } from '@prisma/client'
import request from 'supertest'

let prisma: PrismaClient
let app: INestApplication

const makeFakeBadge = (): Badge => {
  return {
    id: 'valid_id',
    criteria: 'any-criteria',
    description: 'some description',
    icon: 'http://some-badge-url.com/badge.png',
    name: 'some name',
    type: 'some-type'
  }
}

describe('BadgeRoutesController', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getPrisma()
  })

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await prisma.badge.deleteMany()
    await app.close()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  describe('GET /badge', () => {
    it('Should return 200 when search badges and body is not empty', async () => {
      await prisma.badge.create({
        data: makeFakeBadge()
      })
      const response = await request(app.getHttpServer())
        .get('/badge')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          description: 'some description',
          icon: 'http://some-badge-url.com/badge.png',
          name: 'some name',
          type: 'some-type'
        })
      ]))
    })
  })
})
