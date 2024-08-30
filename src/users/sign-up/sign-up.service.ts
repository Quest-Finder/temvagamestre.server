import env from '@/configs/env'
import { JwtSignAdapter } from '@/infra/cryptography/jwt-sign-adapter'
import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

type CreateSignUpDto = {
  email: string
  password: string
}

@Injectable()
export class SignUpService {
  constructor (private readonly prismaService: PrismaService) {}

  async create ({ email, password }: CreateSignUpDto) {
    console.log('Aqui')
    try {
      const uuidAdapter = new UuidAdapter()
      await this.prismaService.userWithEmail.create({
        data: {
          email,
          password,
          id: uuidAdapter.build()
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
