export interface IdBuilder {
  build: () => string
  validate: (id: string) => boolean
}
