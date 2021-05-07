import { ServiceIdentifier, ServiceMetadata } from './types'

export class Container {
  public constructor(
    private readonly services: ReadonlyMap<
      ServiceIdentifier<unknown>,
      ServiceMetadata<unknown>
    >
  ) {}

  public get<T>(identifier: ServiceIdentifier<T>): T {
    const metadata = this.findServiceMetadataOrThrow(identifier)
    const dependencies = this.getDependencies(metadata.dependencies)

    return new metadata.implementation(...dependencies)
  }

  private findServiceMetadataOrThrow<T>(
    identifier: ServiceIdentifier<T>
  ): ServiceMetadata<T> {
    const service = this.services.get(identifier)

    if (!service) {
      throw new Error(`Service not registered for: ${identifier.name}`)
    }

    return service as ServiceMetadata<T>
  }

  private getDependencies(
    dependencyIdentifiers: Array<ServiceIdentifier<unknown>>
  ): unknown[] {
    const dependencies = new Array<unknown>()
    for (const dependencyIdentifier of dependencyIdentifiers) {
      dependencies.push(this.get(dependencyIdentifier))
    }

    return dependencies
  }
}
