import { getDependencies, getDependencyCount } from './reflection'
import {
  BuildOptions,
  ServiceIdentifier,
  ServiceListMetadata,
  ServiceMetadata,
  ServiceRegistration,
} from './types'

const buildServiceMetadata = <T>(
  registration: ServiceRegistration<T>,
  options: BuildOptions
): ServiceMetadata<T> => {
  const autowire = options.autowire && registration.autowire
  if (
    !autowire &&
    registration.implementation &&
    getDependencyCount(registration.identifier) >
      registration.dependencies.length
  ) {
    throw new Error(
      `Dependencies must be provided fot non autowired services. Service with missing dependencies: ${registration.identifier.name}`
    )
  }

  const dependencies = autowire
    ? getDependencies(registration.implementation)
    : registration.dependencies

  return {
    implementation: registration.implementation,
    dependencies,
  }
}

export const buildMetadata = (
  registrations: Set<ServiceRegistration<unknown>>,
  options: BuildOptions
): ServiceListMetadata => {
  const services: Map<
    ServiceIdentifier<unknown>,
    ServiceMetadata<unknown>
  > = new Map<ServiceIdentifier<unknown>, ServiceMetadata<unknown>>()
  for (const registration of registrations) {
    services.set(
      registration.identifier,
      buildServiceMetadata(registration, options)
    )
  }

  return services
}
