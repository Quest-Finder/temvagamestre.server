import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { type RpgStyleModel } from './repository/entities/rpg-style.entity'
const makeFakeRpgStylesModel = (): RpgStyleModel[] => ([{
  id: 'any_rpg_style_id_1',
  name: 'any_name_1'
}, {
  id: 'any_rpg_style_id_2',
  name: 'any_name_2'
}])

let app: INestApplication
let prismaService: PrismaService
describe('RpgStylesController', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    prismaService = module.get<PrismaService>(PrismaService)
    await prismaService.rpgStyle.deleteMany()
    await prismaService.$connect()
    await app.init()
  })

  afterEach(async () => {
    await prismaService.rpgStyle.deleteMany()
    await prismaService.$disconnect()
    await app.close()
  })

  describe('GET /rpg-style', () => {
    it('Should return 200 when returns all rgp styles', async () => {
      await prismaService.rpgStyle.createMany({
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
