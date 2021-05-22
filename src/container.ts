import { ServiceData } from './internal-types'
import { RegistrationType } from './registration-type'
import { ScopeType } from './scope-type'
import { Identifier } from './types'

/**
 * Creates, wires dependencies and manages lifetime for a set of services.
 * Most instances of Container are created by a [[ContainerBuilder]].
 */
export class Container {
  private readonly singletons = new Map<Identifier<unknown>, unknown>()

  /**
   * @internal
   */
  public constructor(
    private readonly services: ReadonlyMap<
      Identifier<unknown>,
      ServiceData<unknown>
    >
  ) {}

  /**
   * Gets the service object of the registered identifier.
   * @param identifier Class of the service to get.
   * @typeParam T The type of the service.
   * @returns
   */
  public get<T>(identifier: Identifier<T>): T {
    return this.getService(identifier, new Map<Identifier<unknown>, unknown>())
  }

  private getService<T>(
    identifier: Identifier<T>,
    perRequestServices: Map<Identifier<unknown>, unknown>
  ): T {
    const data = this.findServiceDataOrThrow(identifier)
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
        perRequestServices
      )
      instance = new data.class(...dependencies)
    } else {
      instance = data.factory(this)
    }

    if (data.scope === ScopeType.Singleton) {
      this.singletons.set(identifier, instance)
    } else if (data.scope === ScopeType.Request) {
      perRequestServices.set(identifier, instance)
    }

    return instance
  }

  private findServiceDataOrThrow<T>(identifier: Identifier<T>): ServiceData<T> {
    const service = this.services.get(identifier)

    if (!service) {
      throw new Error(`Service not registered for: ${identifier.name}`)
    }

    return service as ServiceData<T>
  }

  private getDependencies(
    dependencyIdentifiers: Array<Identifier<unknown>>,
    perRequestServices: Map<Identifier<unknown>, unknown>
  ): unknown[] {
    const dependencies = new Array<unknown>()
    for (const dependencyIdentifier of dependencyIdentifiers) {
      dependencies.push(
        this.getService(dependencyIdentifier, perRequestServices)
      )
    }

    return dependencies
  }
}
