import bcrypt from 'bcrypt'
import env from '@/configs/env'
import { JwtSignAdapter } from '@/infra/cryptography/jwt-sign-adapter'
import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { SignUpWithEmailDto } from './sign-up-with-email-dto'

const SALT_ROUNDS = 10

@Injectable()
export class SignUpService {
  constructor (private readonly prismaService: PrismaService) {}

  async create ({ email, password }: SignUpWithEmailDto): Promise<{ token: string } | undefined> {
    console.log('Aqui')

    try {
      const signUpData = new SignUpWithEmailDto(email, password)

      const user = await this.prismaService.userWithEmail.findUnique({ where: { email } })

      if (user) {
        throw new Error('User already exists')
      }

      const uuidAdapter = new UuidAdapter()
      const hashedPassword = await bcrypt.hashSync(password, SALT_ROUNDS)
      await this.prismaService.userWithEmail.create({
        data: {
          id: uuidAdapter.build(),
          email: signUpData.email,
          password: hashedPassword
        }
      })

      const jwtSignAdapter = new JwtSignAdapter(env.jwtSecretKey)
      const token = jwtSignAdapter.execute(email)

      return token
    } catch (error) {
      console.log(error)
    }
  }
}
