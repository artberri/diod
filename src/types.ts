/* eslint-disable @typescript-eslint/ban-types */

import { Container } from './container'

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
