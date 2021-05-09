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

export type ServiceRegistration<T> = {
  identifier: ServiceIdentifier<T>
  implementation: Newable<T>
  dependencies: Array<ServiceIdentifier<unknown>>
  autowire: boolean
}

export type ServiceListMetadata = Map<
  ServiceIdentifier<unknown>,
  ServiceMetadata<unknown>
>

export type RegisterOptions =
  | {
      dependencies: Array<ServiceIdentifier<unknown>>
      autowire: false
    }
  | { autowire: true; dependencies: [] }

export type BuildOptions = {
  autowire?: boolean
}
