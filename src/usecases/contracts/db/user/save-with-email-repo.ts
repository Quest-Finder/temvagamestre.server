export type SaveWithEmailRepoProps = {
  email: string
  password: string
}

export interface SaveWithEmailRepo {
  execute: (props: SaveWithEmailRepoProps) => Promise<void>
}
