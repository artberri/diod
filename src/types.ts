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
 * Instances of Container are created by a {@link ContainerBuilder}.
 */
export interface Container {
	/**
	 * Gets the service object of the registered identifier.
	 * @param identifier Class of the service to get.
	 * @typeParam T The type of the service.
	 * @returns
	 */
	get<T>(identifier: Identifier<T>): T
	/**
	 * Returns service ids for a given tag.
	 * @param tag The tag name.
	 * @typeParam T The type of the returned services.
	 * @returns An array of service identifiers tagged with the given tag.
	 */
	findTaggedServiceIdentifiers<T = unknown>(tag: string): Array<Identifier<T>>
}

/**
 * Represents a factory to create instances of a class.
 * The {@link Container } will be passed to the registered factory to be able to
 * get any other service.
 * @typeParam T Class type.
 */
export type Factory<T> = (container: Container) => T

/**
 * Represents an instance of a class.
 * @typeParam T Class type.
 */
export type Instance<T> = T & Object

/**
 * Options for the {@link Container} build method.
 */
export type BuildOptions = {
	/** Whether to autowire dependencies based on types or not. Default value: `true`.  */
	autowire?: boolean
}

/**
 * Configuration that allows scope change
 */
export interface ConfigurableRegistration {
	/**
	 * The service can be used as a dependency and it can be queried from the container.
	 * @returns
	 */
	public(): this
	/**
	 * The service can only be used as a dependency and it can't be queried from the container.
	 * @returns
	 */
	private(): this
	/**
	 * Tag the service (the tag will be added to previously added tags if there are).
	 * @returns
	 */
	addTag(tag: string): this
}

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
	 * within a {@link Container}.get request.
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
	 * @returns Configuration fluent API for classes
	 */
	useClass(
		newable: Newable<T>
	): ConfigurableRegistration & WithScopeChange & WithDependencies

	/**
	 * Configure the class implementation that the identifier will provide.
	 * Alias of `useClass`.
	 * @param newable The implementation that the identifier will provide.
	 * @returns Configuration fluent API for classes
	 */
	use(
		newable: Newable<T>
	): ConfigurableRegistration & WithScopeChange & WithDependencies

	/**
	 * Configure the instance that the identifier will provide.
	 * @param instance The instance that the identifier will provide.
	 * @returns Configuration fluent API for instances
	 */
	useInstance(instance: Instance<T>): ConfigurableRegistration

	/**
	 * Configure a factory that returns the instance that the identifier will provide.
	 * @param factory The factory that will be executed when the identifier is requested.
	 * @returns Configuration fluent API for factories
	 */
	useFactory(factory: Factory<T>): ConfigurableRegistration & WithScopeChange
}
