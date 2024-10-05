import { AppModule } from '@/app.module'
import env from '@/configs/env'
import { makeUuidAdapter } from '@/factories/infra/id/uuid-adapter-factory'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { PrismaService } from '@/shared/prisma/prisma.service'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as crypto from 'crypto'
import request from 'supertest'

const secret = env.webhookSecret
const svixId = makeUuidAdapter().build()
const timestamp = new Date()

const bodyData = {
  data: {
    birthday: '',
    created_at: timestamp,
    email_addresses: [{
      email_address: 'example@example.org',
      id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
      linked_to: [],
      object: 'email_address',
      verification: {
        status: 'verified',
        strategy: 'ticket'
      }
    }],
    external_accounts: [],
    external_id: '567772',
    first_name: 'any_first_name',
    gender: '',
    id: 'user_29w83sxmDNGwOuEthce5gg56FcC',
    last_name: 'any_last_name',
    locked: false,
    last_sign_in_at: timestamp,
    object: 'user',
    password_enabled: true,
    phone_numbers: [],
    primary_email_address_id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
    primary_phone_number_id: null,
    primary_web3_wallet_id: null,
    private_metadata: {},
    profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
    public_metadata: {},
    two_factor_enabled: false,
    unsafe_metadata: {},
    updated_at: timestamp,
    username: null,
    web3_wallets: []
  },
  object: 'event',
  type: 'user.created'
}

const secretBytes = Buffer.from(secret, 'base64')
const time = Math.floor(timestamp.getTime() / 1000)
const signedContent = `${svixId}.${time}.${JSON.stringify(bodyData)}`
const signature = crypto
  .createHmac('sha256', secretBytes)
  .update(signedContent)
  .digest('base64')

let app: INestApplication
let prismaService: PrismaService
describe('Webhook clerk auth', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
  })

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)

    app = module.createNestApplication()
    await prismaService.$connect()
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.user.deleteMany()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /user/signup/webhook', () => {
    it('Should return 204 when signup a user', async () => {
      await request(app.getHttpServer())
        .post('/user/signup/webhook-dev')
        .set({
          'svix-id': svixId,
          'svix-timestamp': time.toString(),
          'svix-signature': `v1,${signature}`
        })
        .send(bodyData)
        .expect(204)
      const user = await prismaService.user.findFirst({ where: { email: 'example@example.org' } })
      expect(user).toEqual(expect.objectContaining({
        email: 'example@example.org',
        externalAuthId: 'user_29w83sxmDNGwOuEthce5gg56FcC'
      }))
    })
  })
})
