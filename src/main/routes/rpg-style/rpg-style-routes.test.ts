/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
*/

import { Test } from '@nestjs/testing'
import { type RpgStyleModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type INestApplication } from '@nestjs/common'
import { type PrismaClient } from '@prisma/client'
import { AppModule } from '@/main/app.module'
import request from 'supertest'

const makeFakeRpgStylesModel = (): RpgStyleModel[] => ([{
  id: 'any_rpg_style_id_1',
  name: 'any_name_1'
}, {
  id: 'any_rpg_style_id_2',
  name: 'any_name_2'
}])

let prisma: PrismaClient
let app: INestApplication

describe('Rpg Style Routes', () => {
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
    await app.close()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  describe('GET /rpg-style', () => {
    it('Should return 200 when returns all rgp styles', async () => {
      await prisma.rpgStyle.createMany({
        data: makeFakeRpgStylesModel()
      })
      await request(app.getHttpServer())
        .get('/rpg-style')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            makeFakeRpgStylesModel()
          )
        })
    })
  })
})
