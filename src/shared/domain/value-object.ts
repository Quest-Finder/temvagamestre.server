type Props = Record<string, any> | string | number

export abstract class ValueObject<T extends Props> {
  protected constructor (private readonly props: T) {}

  get value (): T {
    return this.props
  }
}
