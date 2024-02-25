import { Buildable, ServiceData } from '../internal-types'
import { getDependencies, getDependencyCount } from '../reflection'
import { RegistrationType } from '../registration-type'
import { ScopeType } from '../scope-type'
import {
	BuildOptions,
	Identifier,
	Newable,
	WithDependencies,
	WithScopeChange,
} from '../types'
import { ServiceConfiguration } from './service-configuration'

export class ClassConfiguration<T>
	extends ServiceConfiguration<T>
	implements WithScopeChange, WithDependencies
{
	protected scope = ScopeType.Transient
	private dependencies: Array<Identifier<unknown>> = []
	private autowire = true

	private constructor(private readonly newable: Newable<T>) {
		super()
	}

	public withDependencies(dependencies: Array<Identifier<unknown>>): this {
		this.dependencies = dependencies
		this.autowire = false
		return this
	}

	public asTransient(): this {
		return super.asTransient()
	}

	public asSingleton(): this {
		return super.asSingleton()
	}

	public asInstancePerRequest(): this {
		return super.asInstancePerRequest()
	}

	private setDependencyInformationIfNotExist(
		identifier: Newable<T>,
		options: BuildOptions,
	): void {
		const autowire = options.autowire && this.autowire
		if (
			!autowire &&
			getDependencyCount(this.newable) > this.dependencies.length
		) {
			throw new Error(
				`Dependencies must be provided for non autowired services. Service with missing dependencies: ${identifier.name}`,
			)
		}

		if (autowire) {
			this.dependencies = getDependencies(this.newable)
		}
	}

	protected build(options: BuildOptions): ServiceData<T> {
		this.setDependencyInformationIfNotExist(this.newable, options)

		return {
			tags: this.tags,
			isPrivate: this.isPrivate,
			scope: this.scope,
			type: RegistrationType.Class,
			class: this.newable,
			dependencies: this.dependencies,
			autowire: this.autowire,
		}
	}

	public static createBuildable<TIdentifier>(
		newable: Newable<TIdentifier>,
	): Buildable<ClassConfiguration<TIdentifier>, TIdentifier> {
		const use = new ClassConfiguration(newable)
		return {
			instance: use,
			build: (options: BuildOptions): ServiceData<TIdentifier> =>
				use.build(options),
		}
	}
}
