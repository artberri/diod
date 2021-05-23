/* eslint-disable @typescript-eslint/ban-types */

/**
 * Represents a newable class.
 * @typeParam T Class type.
 */
export interface Newable<T> extends Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T
}

/**
 * Represents an abstract class.
 * @typeParam T Class type.
 */
export interface Abstract<T> extends Function {
  prototype: T
}

/**
 * Service identifier. Can be a concrete implementation or an abstraction.
 * @typeParam T Class type.
 */
export type Identifier<T> = Newable<T> | Abstract<T>

/**
 * Creates, wires dependencies and manages lifetime for a set of services.
 * Instances of Container are created by a [[ContainerBuilder]].
 */
export interface Container {
  /**
   * Gets the service object of the registered identifier.
   * @param identifier Class of the service to get.
   * @typeParam T The type of the service.
   * @returns
   */
  get<T>(identifier: Identifier<T>): T
}

/**
 * Represents a factory to create instances of a class.
 * The [[Container]] will be passed to the registered factory to be able to
 * get any other service.
 * @typeParam T Class type.
 */
export type Factory<T> = (container: Container) => T

/**
 * Service instance.
 * @internal
 */
export type Instance<T extends Object> = T

/**
 * Options for the [[Container]] build method.
 */
export type BuildOptions = {
  /** Whether to autowire dependencies based on types or not. Default value: `true`.  */
  autowire?: boolean
}

/**
 * Configuration that allows scope change
 */
export interface WithScopeChange {
  /**
   * Configure the service so that always gets a new instance.
   * @returns
   */
  asTransient(): this
  /**
   * Configure the service so that always gets the same, shared instance.
   * @returns
   */
  asSingleton(): this
  /**
   * Configure the service so that the same shared instance is used during
   * within a [[Container]].get request.
   * @returns
   */
  asInstancePerRequest(): this
}

/**
 * Configuration that allows to manage dependencies manually
 */
export interface WithDependencies {
  /**
   * Declare class dependencies manually
   * @param dependencies List of class dependency identifiers to inject in
   * order to the constructor.
   * @returns
   */
  withDependencies(dependencies: Array<Identifier<unknown>>): this
}

export interface Registration<T> {
  /**
   * Configure the class implementation that the identifier will provide.
   * @param newable The implementation that the identifier will provide.
   * @returns
   */
  useClass(newable: Newable<T>): WithScopeChange & WithDependencies

  /**
   * Configure the class implementation that the identifier will provide.
   * Alias of `useClass`.
   * @param newable The implementation that the identifier will provide.
   * @returns Configuration fluent API for classes
   */
  use(newable: Newable<T>): WithScopeChange & WithDependencies

  /**
   * Configure the instance that the identifier will provide.
   * @param instance The instance that the identifier will provide.
   */
  useInstance(instance: Instance<T>): void

  /**
   * Configure a factory that returns the instance that the identifier will provide.
   * @param factory The factory that will be executed when the identifier is requested.
   * @returns Configuration fluent API for factories
   */
  useFactory(factory: Factory<T>): WithScopeChange
}
