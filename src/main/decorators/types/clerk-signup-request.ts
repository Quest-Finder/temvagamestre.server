export type ClerkEmailAddress = {
  email_address: string
  id: string
  linked_to: string[]
  object: string
  verification: {
    status: string
    strategy: string
  }
}

export type ClerkSignUpUserData = {
  birthday: string
  created_at: number
  email_addresses: ClerkEmailAddress[]
  external_accounts: any[]
  external_id: string
  first_name: string
  gender: string
  id: string
  last_name: string
  locked: boolean
  last_sign_in_at: number
  object: string
  password_enabled: boolean
  phone_numbers: any[]
  primary_email_address_id: string
  primary_phone_number_id: string | null
  primary_web3_wallet_id: string | null
  private_metadata: Record<string, any>
  profile_image_url: string
  public_metadata: Record<string, any>
  two_factor_enabled: boolean
  unsafe_metadata: Record<string, any>
  updated_at: number
  username: string | null
  web3_wallets: any[]
}

export type ClerkSignUpEventData = {
  data: ClerkSignUpUserData
  object: string
  type: string
}
