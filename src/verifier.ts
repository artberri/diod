import { ServiceIdentifier, ServiceMetadata } from './types'

export class Verifier {
  public constructor(
    private readonly services: Map<
      ServiceIdentifier<unknown>,
      ServiceMetadata<unknown>
    >
  ) {}

  public verify(): void {
    for (const [identifier, metadata] of this.services) {
      this.verifyMetadata(identifier, metadata)
      this.verifyCircularDependencies(identifier, metadata)
    }
  }

  private verifyMetadata<T>(
    identifier: ServiceIdentifier<T>,
    metadata: ServiceMetadata<T>
  ): void {
    const missing = new Array<string>()
    for (const dependencyIdentifier of metadata.dependencies) {
      if (!this.services.has(dependencyIdentifier)) {
        missing.push(dependencyIdentifier.name)
      }
    }

    if (missing.length > 0) {
      throw new Error(
        `Service not registered for the following dependencies of ${
          identifier.name
        }: ${missing.join(', ')}`
      )
    }
  }

  private verifyCircularDependencies<T>(
    identifier: ServiceIdentifier<T>,
    metadata: ServiceMetadata<T>,
    dependencyTree: string[] = []
  ): void {
    for (const dependencyIdentifier of metadata.dependencies) {
      if (identifier.name === dependencyIdentifier.name) {
        throw new Error(
          `Circular dependency detected: ${
            identifier.name
          } -> ${dependencyTree.join(' -> ')} -> ${identifier.name}`
        )
      }
      const dependencyMetadata = this.services.get(
        dependencyIdentifier
      ) as ServiceMetadata<unknown>
      if (dependencyMetadata.dependencies.length > 0) {
        this.verifyCircularDependencies(identifier, dependencyMetadata, [
          ...dependencyTree,
          dependencyIdentifier.name,
        ])
      }
    }
  }
}
