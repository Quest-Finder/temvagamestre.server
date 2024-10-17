import { JwtSignAdapterV2 } from '@/infra/cryptography/jwt-sign-adapter-v2'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { SignUpWithEmailDto } from './sign-up-with-email-dto'

const SALT_ROUNDS = 10

@Injectable()
export class SignUpService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly jwtSignAdapterV2: JwtSignAdapterV2
  ) {}

  async create ({ email, password }: SignUpWithEmailDto): Promise<{ token: string }> {
    const signUpData = new SignUpWithEmailDto(email, password)
    const user = await this.prismaService.userWithEmail.findUnique({ where: { email } })

    if (user) {
      throw new ConflictException(`Já existe um email cadastrado com o ${email} informado`)
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    await this.prismaService.userWithEmail.create({
      data: {
        id: v4(),
        email: signUpData.email,
        password: hashedPassword
      }
    })

    const token = this.jwtSignAdapterV2.execute(email)

    return token
  }
}
