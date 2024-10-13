import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

let prismaService: PrismaService
let app: INestApplication

describe('PlayerProfileController', () => {
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)
    app = module.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    await prismaService.address.deleteMany()
    await prismaService.cityState.deleteMany()
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.userConfig.deleteMany()
    await prismaService.userBadge.deleteMany()
    await prismaService.user.deleteMany()
    await prismaService.playerProfile.deleteMany()
    await prismaService.rpgStyle.deleteMany()
    await prismaService.badge.deleteMany()
    await prismaService.socialMedia.deleteMany()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /player-profile', () => {
    it('Should return 200 with a empty player profile list', async () => {
      await request(app.getHttpServer())
        .get('/player-profile')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            []
          )
        })
    })
    it('Should return 200 with a player profile list', async () => {
      await prismaService.playerProfile.createMany({
        data: [
          { id: 'valid-id-1', name: 'player-profile-1', description: 'player-profile-1-description' },
          { id: 'valid-id-2', name: 'player-profile-2', description: 'player-profile-2-description' }
        ]
      })
      await request(app.getHttpServer())
        .get('/player-profile')
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
