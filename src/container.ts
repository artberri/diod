import { getDependencies } from './reflection'
import { Newable, ServiceIdentifier, ServiceMetadata } from './types'

export class Container {
  private readonly services: Map<
    ServiceIdentifier<unknown>,
    ServiceMetadata<unknown>
  > = new Map<ServiceIdentifier<unknown>, ServiceMetadata<unknown>>()

  public get<T>(identifier: ServiceIdentifier<T>): T {
    const metadata = this.findServiceMetadataOrThrow(identifier)
    const dependencies = this.findServiceDependenciesOrThrow(
      identifier.name,
      metadata
    )

    return new metadata.implementation(...dependencies)
  }

  public register<T>(implementation: Newable<T>): void {
    const dependencies = getDependencies(implementation)

    this.services.set(implementation, {
      implementation,
      dependencies,
    })
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

  private findServiceDependenciesOrThrow<T>(
    serviceName: string,
    metadata: ServiceMetadata<T>
  ): unknown[] {
    const missing = new Array<string>()
    const dependencies = new Array<unknown>()
    for (const dependencyIdentifier of metadata.dependencies) {
      try {
        const dependency = this.get(dependencyIdentifier)
        dependencies.push(dependency)
      } catch {
        missing.push(dependencyIdentifier.name)
      }
    }

    if (missing.length > 0) {
      throw new Error(
        `Service not registered for the following dependencies of ${serviceName}: ${missing.join(
          ', '
        )}`
      )
    }

    return dependencies
  }
}
