export type SignUpWithEmailRepoProps = {
  id: string
  email: string
  password: string
}

export interface SignUpWithEmailRepo {
  execute: (props: SignUpWithEmailRepoProps) => Promise<void>
}
