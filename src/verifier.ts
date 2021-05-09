import {
  ServiceIdentifier,
  ServiceListMetadata,
  ServiceMetadata,
} from './types'

const verifyMetadata = <T>(
  identifier: ServiceIdentifier<T>,
  metadata: ServiceMetadata<T>,
  services: ServiceListMetadata
): void => {
  const missing = new Array<string>()
  for (const dependencyIdentifier of metadata.dependencies) {
    if (!services.has(dependencyIdentifier)) {
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

const verifyCircularDependencies = <T>(
  identifier: ServiceIdentifier<T>,
  metadata: ServiceMetadata<T>,
  services: ServiceListMetadata,
  dependencyTree: string[] = []
): void => {
  for (const dependencyIdentifier of metadata.dependencies) {
    if (identifier.name === dependencyIdentifier.name) {
      throw new Error(
        `Circular dependency detected: ${
          identifier.name
        } -> ${dependencyTree.join(' -> ')} -> ${identifier.name}`
      )
    }
    const dependencyMetadata = services.get(
      dependencyIdentifier
    ) as ServiceMetadata<unknown>
    if (dependencyMetadata.dependencies.length > 0) {
      verifyCircularDependencies(identifier, dependencyMetadata, services, [
        ...dependencyTree,
        dependencyIdentifier.name,
      ])
    }
  }
}

export const verify = (services: ServiceListMetadata): void => {
  for (const [identifier, metadata] of services) {
    verifyMetadata(identifier, metadata, services)
    verifyCircularDependencies(identifier, metadata, services)
  }
}
