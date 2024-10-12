import { PrismaClient, type SocialMedia } from '@/infra/database/prisma/client'
import { v4 } from 'uuid'

export const addSocialMediaSeed = async (): Promise<void> => {
  const socialMedia: SocialMedia[] = [{
    id: v4(),
    name: 'Instagram',
    baseUri: 'instagram.com/'
  }, {
    id: v4(),
    name: 'Discord',
    baseUri: 'discordapp.com/users/'
  }, {
    id: v4(),
    name: 'X',
    baseUri: 'x.com/'
  }, {
    id: v4(),
    name: 'Reddit',
    baseUri: 'reddit.com/user/'
  }, {
    id: v4(),
    name: 'Facebook',
    baseUri: 'facebook.com/'
  }]
  const prisma = new PrismaClient()

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
