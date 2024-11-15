import { JwtSignAdapterV2 } from '@/infra/cryptography/jwt-sign-adapter-v2'
import { AuthRepository } from '@/users/repository/auth/auth-repository'
import { UserRepository } from '@/users/repository/user/user-repository'
import { ConflictException, Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { SignUpWithEmailDto } from '../../controllers/sign-up-with-email/dto/sign-up-with-email-dto'

const SALT_ROUNDS = 10

@Injectable()
export class SignUpService {
  constructor (
    private readonly repository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtSignAdapterV2: JwtSignAdapterV2
  ) {}

  async create ({ email, password }: SignUpWithEmailDto): Promise<{ token: string }> {
    const signUpData = new SignUpWithEmailDto(email, password)
    const user = await this.repository.findByEmail(email)
    const userApp = await this.userRepository.findByEmail(email)
    if (user ?? userApp) {
      throw new ConflictException(`Já existe um email cadastrado com o ${email} informado`)
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const savedUserEmail = await this.repository.save({
      email: signUpData.email,
      password: hashedPassword
    })

    await this.userRepository.createUser({
      email: savedUserEmail.email,
      name: '',
      externalAuthId: savedUserEmail.id
    })

    const token = this.jwtSignAdapterV2.execute({
      userId: savedUserEmail.id,
      email: savedUserEmail.email
    })

    return token
  }
}
