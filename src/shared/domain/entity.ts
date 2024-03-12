import { UniqueEntityId } from './unique-entity-id'

export abstract class Entity<T> {
  private readonly _uniqueEntityId: UniqueEntityId

  protected constructor (protected readonly props: T, id?: UniqueEntityId) {
    this._uniqueEntityId = id ?? new UniqueEntityId()
  }

  get id (): string {
    return this._uniqueEntityId.value
  }
}
