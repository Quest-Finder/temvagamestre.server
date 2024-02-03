export type Either<L extends Error, R> = Left<L, R> | Right<L, R>

class Left<L extends Error, R> {
  constructor (readonly value: L) {}

  isLeft (): this is Left<L, R> {
    return true
  }

  isRight (): this is Right<L, R> {
    return false
  }
}

class Right<L extends Error, R> {
  constructor (readonly value: R) {}

  isLeft (): this is Left<L, R> {
    return false
  }

  isRight (): this is Right<L, R> {
    return true
  }
}

export const left = <L extends Error, R>(l: L): Either<L, R> => {
  return new Left<L, R>(l)
}

export const right = <L extends Error, R>(r: R): Either<L, R> => {
  return new Right<L, R>(r)
}
