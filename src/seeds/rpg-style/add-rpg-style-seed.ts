import { PrismaClient } from '@/infra/database/prisma/client'
import * as uuid from 'uuid'

const rpgStyleNames: string[] = [
  'Fantasia Heroica',
  'Ninja vs Samurai',
  'Espada e Feitiçaria',
  'Fantasia Épica',
  'Fantasia Mítica',
  'Fantasia Sombria',
  'Intriga',
  'Mistério',
  'Guerra',
  'Nave Mãe'
]

const prisma = new PrismaClient()

export async function rgpStyleSeed (): Promise<void> {
  for (const rpgStyle of rpgStyleNames) {
    const existRpgStyle = await prisma.rpgStyle.findFirst({
      where: {
        name: {
          contains: rpgStyle
        }
      }
    })
    if (existRpgStyle === null) {
      await prisma.rpgStyle.create({
        data: {
          id: uuid.v4(),
          name: rpgStyle
        }
      })
    }
  }
}
