export type SignUpWithEmailRepoProps = {
  email: string
  password: string
}

export interface SignUpWithEmailRepo {
  execute: (props: SignUpWithEmailRepoProps) => Promise<void>
}
