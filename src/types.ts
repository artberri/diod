// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<T> = new (...args: any[]) => T

export interface Abstract<T> {
  name: string
  prototype: T
}

export type ServiceIdentifier<T> = Newable<T> | Abstract<T>

export type Service<T> = {
  implementation: Newable<T>
}
