import { PrismaClient } from '@/infra/database/prisma/client'
import { type PlayerProfileModel } from '@/player-profile/repository/model/player-profile.model'
import { v4 } from 'uuid'
const prisma = new PrismaClient()

export const addPlayerProfiles = async (): Promise<void> => {
  const playersProfiles: PlayerProfileModel[] = [
    {
      id: v4(),
      name: 'Exploração',
      description: 'Você gosta de conhecer o mundo em que está se aventurando, adora encontrar e explorar dungeons.'
    },
    {
      id: v4(),
      name: 'Matar e pilhar',
      description: 'Para você, a parte mais importante e divertida de uma partida é a hora de rolar dados e distribuir o dano entre seus inimigos.'
    },
    {
      id: v4(),
      name: 'Interpretação',
      description: 'Para você, a ficha e as regras são apenas uma parte do RPG, você gosta de sentir-se na pele de seu personagem.'
    }
  ]

  for (const playerProfile of playersProfiles) {
    await prisma.playerProfile.upsert({
      where: {
        name: playerProfile.name
      },
      update: {},
      create: {
        id: playerProfile.id,
        name: playerProfile.name,
        description: playerProfile.description
      }
    })
  }
}
