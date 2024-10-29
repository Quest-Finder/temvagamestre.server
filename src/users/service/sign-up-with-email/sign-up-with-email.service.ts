import { JwtSignAdapterV2 } from '@/infra/cryptography/jwt-sign-adapter-v2'
import { UserWithEmailRepository } from '@/users/repository/user-with-email/user-with-email-repository'
import { ConflictException, Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { SignUpWithEmailDto } from '../../controllers/sign-up-with-email/dto/sign-up-with-email-dto'

const SALT_ROUNDS = 10

@Injectable()
export class SignUpService {
  constructor (
    private readonly repository: UserWithEmailRepository,
    private readonly jwtSignAdapterV2: JwtSignAdapterV2
  ) {}

  async create ({ email, password }: SignUpWithEmailDto): Promise<{ token: string }> {
    const signUpData = new SignUpWithEmailDto(email, password)
    const user = await this.repository.findByEmail(email)

    if (user) {
      throw new ConflictException(`Já existe um email cadastrado com o ${email} informado`)
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    await this.repository.save({
      email: signUpData.email,
      password: hashedPassword
    })

    const token = this.jwtSignAdapterV2.execute(email)

    return token
  }
}
