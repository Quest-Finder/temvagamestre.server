/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { AppModule } from '@/app.module'
import { type PrismaClient } from '@/infra/database/prisma/client'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

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

  describe('GET /player-profile', () => {
    it('Should return 200 with a empty player profile list', async () => {
      await request(app.getHttpServer())
        .get('/players-profile')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            []
          )
        })
    })
    it('Should return 200 with a player profile list', async () => {
      await prisma.playerProfile.createMany({
        data: [
          { id: 'valid-id-1', name: 'player-profile-1', description: 'player-profile-1-description' },
          { id: 'valid-id-2', name: 'player-profile-2', description: 'player-profile-2-description' }
        ]
      })
      await request(app.getHttpServer())
        .get('/players-profile')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: 'valid-id-1',
                name: 'player-profile-1',
                description: 'player-profile-1-description'
              }),
              expect.objectContaining({
                id: 'valid-id-2',
                name: 'player-profile-2',
                description: 'player-profile-2-description'
              })
            ])
          )
        })
    })
  })
})
