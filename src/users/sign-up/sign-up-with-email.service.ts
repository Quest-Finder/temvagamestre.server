import bcrypt from 'bcrypt'
import { JwtSignAdapter } from '@/infra/cryptography/jwt-sign-adapter'
import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { SignUpWithEmailDto } from './sign-up-with-email-dto'

const SALT_ROUNDS = 10

@Injectable()
export class SignUpService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly uuidAdapter: UuidAdapter,
    private readonly jwtSignAdapter: JwtSignAdapter
  ) {}

  async create ({ email, password }: SignUpWithEmailDto): Promise<{ token: string }> {
    const signUpData = new SignUpWithEmailDto(email, password)
    const user = await this.prismaService.userWithEmail.findUnique({ where: { email } })

    if (user) {
      throw new ConflictException(`Já existe um email cadastrado com o ${email} informado`)
    }

    const hashedPassword = await bcrypt.hashSync(password, SALT_ROUNDS)
    await this.prismaService.userWithEmail.create({
      data: {
        id: this.uuidAdapter.build(),
        email: signUpData.email,
        password: hashedPassword
      }
    })

    const token = this.jwtSignAdapter.execute(email)

    return token
  }
}
