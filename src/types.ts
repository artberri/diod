// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<T> = new (...args: any[]) => T

export interface Abstract<T> {
  name: string
  prototype: T
}

export type ServiceIdentifier<T> = Newable<T> | Abstract<T>

export type ServiceMetadata<T> = {
  implementation: Newable<T>
  dependencies: Array<ServiceIdentifier<unknown>>
}
