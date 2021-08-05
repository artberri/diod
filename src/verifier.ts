import { ServiceData, ServiceListMetadata } from './internal-types'
import { Abstract } from './types'

const verifyMetadata = <T>(
  identifier: Abstract<T>,
  metadata: ServiceData<T>,
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
  identifier: Abstract<T>,
  metadata: ServiceData<T>,
  services: ServiceListMetadata,
  dependencyTree: string[] = []
): void => {
  for (const dependencyIdentifier of metadata.dependencies) {
    if (identifier === dependencyIdentifier) {
      throw new Error(
        `Circular dependency detected: ${[
          identifier.name,
          ...dependencyTree,
          identifier.name,
        ].join(' -> ')}`
      )
    }
    const dependencyMetadata = services.get(
      dependencyIdentifier
    ) as ServiceData<unknown>
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
