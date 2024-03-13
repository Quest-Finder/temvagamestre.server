import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { makeUuidAdapter } from '@/main/factories/infra/id/uuid-adapter-factory'
import { type SocialMedia } from '@prisma/client'

export const addSocialMediaSeed = async (): Promise<void> => {
  const socialMedia: SocialMedia[] = [{
    id: makeUuidAdapter().build(),
    name: 'Instagram',
    baseUri: 'instagram.com/'
  }, {
    id: makeUuidAdapter().build(),
    name: 'Discord',
    baseUri: 'discordapp.com/users/'
  }, {
    id: makeUuidAdapter().build(),
    name: 'X',
    baseUri: 'x.com/'
  }, {
    id: makeUuidAdapter().build(),
    name: 'Reddit',
    baseUri: 'reddit.com/user/'
  }, {
    id: makeUuidAdapter().build(),
    name: 'Facebook',
    baseUri: 'facebook.com/'
  }]

  const prisma = await PrismaHelper.getPrisma()
  for (const sm of socialMedia) {
    await prisma.socialMedia.upsert({
      where: {
        name: sm.name
      },
      update: {},
      create: {
        id: sm.id,
        name: sm.name,
        baseUri: sm.baseUri
      }
    })
  }
}
