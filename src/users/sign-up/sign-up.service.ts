import bcrypt from 'bcrypt'
import { JwtSignAdapter } from '@/infra/cryptography/jwt-sign-adapter'
import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { SignUpWithEmailDto } from './sign-up-with-email-dto'
import env from '@/configs/env'

const SALT_ROUNDS = 10

@Injectable()
export class SignUpService {
  constructor (private readonly prismaService: PrismaService) {}

  async create ({ email, password }: SignUpWithEmailDto): Promise<{ token: string }> {
    console.log('Aqui')

    const signUpData = new SignUpWithEmailDto(email, password)

    const user = await this.prismaService.userWithEmail.findUnique({ where: { email } })

    if (user) {
      throw new ConflictException(`Já existe um email cadastrado com o ${email} informado`)
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
  }
}
