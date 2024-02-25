import { ServiceData } from './internal-types'
import { RegistrationType } from './registration-type'
import { ScopeType } from './scope-type'
import { Container, Identifier } from './types'

export class DiodContainer implements Container {
	private readonly singletons = new Map<Identifier<unknown>, unknown>()

	public constructor(
		private readonly services: ReadonlyMap<
			Identifier<unknown>,
			ServiceData<unknown>
		>,
	) {}

	public get<T>(identifier: Identifier<T>): T {
		return this.getService(
			identifier,
			new Map<Identifier<unknown>, unknown>(),
			false,
		)
	}

	public findTaggedServiceIdentifiers<T = unknown>(
		tag: string,
	): Array<Identifier<T>> {
		return Array.from(this.services)
			.filter(([, data]) => data.tags.indexOf(tag) >= 0)
			.map(([id]) => id) as Array<Identifier<T>>
	}

	private getService<T>(
		identifier: Identifier<T>,
		perRequestServices: Map<Identifier<unknown>, unknown>,
		isDependency: boolean,
	): T {
		const data = this.findServiceDataOrThrow(identifier, isDependency)

		if (data.scope === ScopeType.Singleton && this.singletons.has(identifier)) {
			return this.singletons.get(identifier) as T
		} else if (
			data.scope === ScopeType.Request &&
			perRequestServices.has(identifier)
		) {
			return perRequestServices.get(identifier) as T
		}

		let instance: T
		if (data.type === RegistrationType.Instance) {
			instance = data.instance
		} else if (data.type === RegistrationType.Class) {
			const dependencies = this.getDependencies(
				data.dependencies,
				perRequestServices,
			)
			instance = new data.class(...dependencies)
		} else {
			instance = data.factory({
				get: <TNew>(id: Identifier<TNew>): TNew => {
					return this.getService(id, perRequestServices, true)
				},
				findTaggedServiceIdentifiers: (tag) =>
					this.findTaggedServiceIdentifiers(tag),
			})
		}

		if (data.scope === ScopeType.Singleton) {
			this.singletons.set(identifier, instance)
		} else if (data.scope === ScopeType.Request) {
			perRequestServices.set(identifier, instance)
		}

		return instance
	}

	private findServiceDataOrThrow<T>(
		identifier: Identifier<T>,
		isDependency: boolean,
	): ServiceData<T> {
		const service = this.services.get(identifier)

		if (!service) {
			throw new Error(`Service not registered for: ${identifier.name}`)
		}

		const data = service as ServiceData<T>

		if (!isDependency && data.isPrivate) {
			throw new Error(
				`The ${identifier.name} service has been registered as private and can not be directly get from the container`,
			)
		}

		return service as ServiceData<T>
	}

	private getDependencies(
		dependencyIdentifiers: Array<Identifier<unknown>>,
		perRequestServices: Map<Identifier<unknown>, unknown>,
	): unknown[] {
		const dependencies = new Array<unknown>()
		for (const dependencyIdentifier of dependencyIdentifiers) {
			dependencies.push(
				this.getService(dependencyIdentifier, perRequestServices, true),
			)
		}

		return dependencies
	}
}
