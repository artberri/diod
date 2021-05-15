/* eslint-disable @typescript-eslint/ban-types */
export type Newable<T> = Function & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T
}

export type Abstract<T> = Function & { prototype: T }

export type Identifier<T> = Newable<T> | Abstract<T>

export type Factory<T> = () => T

export type Instance<T extends Object> = T

export type ClassServiceData<T> = {
  class: Newable<T>
  autowire: boolean
  type: RegistrationType.Class
  dependencies: Array<Abstract<unknown>>
}

export type FactoryServiceData<T> = {
  factory: Factory<T>
  dependencies: never[]
  type: RegistrationType.Factory
}

export type InstanceServiceData<T> = {
  instance: Instance<T>
  type: RegistrationType.Instance
  dependencies: never[]
}

export type ServiceData<T> =
  | ClassServiceData<T>
  | FactoryServiceData<T>
  | InstanceServiceData<T>

export type ServiceListMetadata = Map<Abstract<unknown>, ServiceData<unknown>>

export type BuildOptions = {
  autowire?: boolean
}

export enum RegistrationType {
  Class = 'class',
  Factory = 'factory',
  Instance = 'instance',
}

export type Buildable<C, T> = {
  instance: C
  build: (options: BuildOptions) => ServiceData<T>
}
