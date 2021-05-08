import { Container } from './container'
import { getDependencies, getDependencyCount } from './reflection'
import {
  BuildOptions,
  Newable,
  RegisterOptions,
  ServiceIdentifier,
  ServiceMetadata,
  ServiceRegistration,
} from './types'

export class ContainerBuilder {
  private readonly registrations: Set<ServiceRegistration<unknown>> = new Set<
    ServiceRegistration<unknown>
  >()

  private readonly services: Map<
    ServiceIdentifier<unknown>,
    ServiceMetadata<unknown>
  > = new Map<ServiceIdentifier<unknown>, ServiceMetadata<unknown>>()

  public register<T>(implementation: Newable<T>): void
  public register<T>(implementation: Newable<T>, options: RegisterOptions): void
  public register<T>(
    implementation: Newable<T>,
    dependencies: Array<ServiceIdentifier<unknown>>
  ): void
  public register<T>(
    implementation: Newable<T>,
    optionsOrDependencies?: RegisterOptions | Array<ServiceIdentifier<unknown>>
  ): void {
    const options = this.getRegisterOptions(optionsOrDependencies)
    this.registrations.add({
      implementation,
      identifier: implementation,
      autowire: options.autowire,
      dependencies: options.dependencies,
    })
  }

  public build(options: BuildOptions = {}): Container {
    options.autowire = options.autowire ?? true
    this.buildAllMetadata(options)
    this.verify()
    return new Container(this.services)
  }

  private getRegisterOptions(
    optionsOrDependencies?: RegisterOptions | Array<ServiceIdentifier<unknown>>
  ): RegisterOptions {
    if (Array.isArray(optionsOrDependencies)) {
      return {
        autowire: false,
        dependencies: optionsOrDependencies,
      }
    }

    return optionsOrDependencies || { autowire: true, dependencies: [] }
  }

  private buildAllMetadata(options: BuildOptions): void {
    for (const registration of this.registrations) {
      this.buildMetadata(registration, options)
    }
  }

  private buildMetadata<T>(
    registration: ServiceRegistration<T>,
    options: BuildOptions
  ): void {
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

    this.services.set(registration.identifier, {
      implementation: registration.implementation,
      dependencies,
    })
  }

  private verify(): void {
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
