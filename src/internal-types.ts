import { RegistrationType } from './registration-type'
import { Abstract, BuildOptions, Factory, Instance, Newable } from './types'

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

export type Buildable<C, T> = {
  instance: C
  build: (options: BuildOptions) => ServiceData<T>
}
