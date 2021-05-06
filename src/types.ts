export interface Newable<T> extends Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T
}

export interface Abstract<T> extends Function {
  prototype: T
}

export type ServiceIdentifier<T> = Newable<T> | Abstract<T>

export type ServiceMetadata<T> = {
  implementation: Newable<T>
  dependencies: Array<ServiceIdentifier<unknown>>
}
