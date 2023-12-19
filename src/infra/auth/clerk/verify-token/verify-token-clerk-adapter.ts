import env from '@/main/configs/env'
import { type Decrypter } from '@/usecases/contracts/cryptography/decrypter'
import { Clerk } from '@clerk/clerk-sdk-node'

export class VerifyTokenClerkAdapter implements Decrypter {
  async execute (token: string): Promise<string | null> {
    const clerkClient = Clerk({ secretKey: env.clerkSecretKey })
    const { sub } = await clerkClient.verifyToken(token)
    return sub
  }
}
