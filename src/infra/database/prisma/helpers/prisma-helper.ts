import { PrismaClient } from '../client'

export class PrismaHelper {
  private static prisma: null | PrismaClient

  static async connect (): Promise<void> {
    if (!this.prisma) {
      this.prisma = new PrismaClient()
      await this.prisma.$connect()
    }
    console.log('Prisma connected!')
  }

  static async disconnect (): Promise<void> {
    if (this.prisma) {
      await this.prisma.$disconnect()
      this.prisma = null
    }
    console.log('Prisma disconected!')
  }

  static async getPrisma (): Promise<PrismaClient> {
    if (!this.prisma) {
      await this.connect()
    }
    return this.prisma as PrismaClient
  }
}
