import { Abstract, ClassServiceData, ServiceData } from './types'

export class Container {
  public constructor(
    private readonly services: ReadonlyMap<
      Abstract<unknown>,
      ServiceData<unknown>
    >
  ) {}

  public get<T>(identifier: Abstract<T>): T {
    const data = this.findServiceDataOrThrow(identifier) as ClassServiceData<T>
    const dependencies = this.getDependencies(data.dependencies)

    return new data.class(...dependencies)
  }

  private findServiceDataOrThrow<T>(identifier: Abstract<T>): ServiceData<T> {
    const service = this.services.get(identifier)

    if (!service) {
      throw new Error(`Service not registered for: ${identifier.name}`)
    }

    return service as ServiceData<T>
  }

  private getDependencies(
    dependencyIdentifiers: Array<Abstract<unknown>>
  ): unknown[] {
    const dependencies = new Array<unknown>()
    for (const dependencyIdentifier of dependencyIdentifiers) {
      dependencies.push(this.get(dependencyIdentifier))
    }

    return dependencies
  }
}
