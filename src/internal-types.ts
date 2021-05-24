import { RegistrationType } from './registration-type'
import { ScopeType } from './scope-type'
import { Abstract, BuildOptions, Factory, Instance, Newable } from './types'

type ConfigurationServiceData = {
  isPrivate: boolean
  tags: string[]
}

export type ClassServiceData<T> = {
  scope: ScopeType
  class: Newable<T>
  autowire: boolean
  type: RegistrationType.Class
  dependencies: Array<Abstract<unknown>>
} & ConfigurationServiceData

export type FactoryServiceData<T> = {
  scope: ScopeType
  factory: Factory<T>
  dependencies: never[]
  type: RegistrationType.Factory
} & ConfigurationServiceData

export type InstanceServiceData<T> = {
  scope: ScopeType.Singleton
  instance: Instance<T>
  type: RegistrationType.Instance
  dependencies: never[]
} & ConfigurationServiceData

export type ServiceData<T> =
  | ClassServiceData<T>
  | FactoryServiceData<T>
  | InstanceServiceData<T>

export type ServiceListMetadata = Map<Abstract<unknown>, ServiceData<unknown>>

export type Buildable<C, T> = {
  instance: C
  build: (options: BuildOptions) => ServiceData<T>
}
