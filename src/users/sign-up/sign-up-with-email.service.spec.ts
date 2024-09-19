import { Test, type TestingModule } from '@nestjs/testing'
import { SignUpService } from './sign-up-with-email.service'
import { ConflictException } from '@nestjs/common'
import { PrismaService } from '@/shared/prisma/prisma.service'
import bcrypt from 'bcrypt'
import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { JwtSignAdapterV2 } from '@/infra/cryptography/jwt-sign-adapter-v2'

describe('SignUpService', () => {
  let service: SignUpService

  const SALTED_ROUNDS = 10

  const mockPrismaService = {
    userWithEmail: {
      findUnique: jest.fn(),
      create: jest.fn()
    }
  }

  const mockUuidAdapter = {
    build: jest.fn().mockReturnValue('some-uuid')
  }

  const mockHashAdapter = {
    hash: jest.fn().mockResolvedValue('hashed-password')
  }

  const mockJwtSignAdapter = {
    sign: jest.fn().mockResolvedValue('some-token')
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: UuidAdapter, useValue: mockUuidAdapter },
        { provide: 'HashAdapter', useValue: mockHashAdapter },
        { provide: JwtSignAdapterV2, useValue: mockJwtSignAdapter }
      ]
    }).compile()

    service = module.get<SignUpService>(SignUpService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a new user and return a token', async () => {
    const bcryptHashSpy = jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('hashed-password')

    mockPrismaService.userWithEmail.findUnique.mockResolvedValueOnce(null)
    mockPrismaService.userWithEmail.create.mockResolvedValueOnce({ id: 'some-uuid' })

    const result = await service.create({ email: 'newuser@example.com', password: '123456' })

    expect(bcryptHashSpy).toHaveBeenCalledWith('123456', SALTED_ROUNDS)
    expect(mockPrismaService.userWithEmail.create).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        email: 'newuser@example.com',
        password: 'hashed-password'
      }
    })
    expect(result).toEqual({ token: expect.any(String) })
  })

  it('should throw ConflictException if user already exists', async () => {
    mockPrismaService.userWithEmail.findUnique.mockResolvedValueOnce({ email: 'test@example.com' })

    await expect(service.create({ email: 'test@example.com', password: 'whateverpassword123' }))
      .rejects.toThrow(new ConflictException('Já existe um email cadastrado com o test@example.com informado'))

    expect(mockPrismaService.userWithEmail.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' }
    })
  })
})
