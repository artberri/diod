import { Container } from './container'
import { getDependencies } from './reflection'
import { Newable, ServiceIdentifier, ServiceMetadata } from './types'

export class ContainerBuilder {
  private readonly implementations: Set<Newable<unknown>> = new Set<
    Newable<unknown>
  >()

  private readonly services: Map<
    ServiceIdentifier<unknown>,
    ServiceMetadata<unknown>
  > = new Map<ServiceIdentifier<unknown>, ServiceMetadata<unknown>>()

  public register<T>(implementation: Newable<T>): void {
    this.implementations.add(implementation)
  }

  public build(): Container {
    this.buildAllMetadata()
    this.verifyAllMetadata()
    return new Container(this.services)
  }

  private buildAllMetadata(): void {
    for (const implementation of this.implementations) {
      this.buildMetadata(implementation)
    }
  }

  private buildMetadata<T>(implementation: Newable<T>): void {
    const dependencies = getDependencies(implementation)

    this.services.set(implementation, {
      implementation,
      dependencies,
    })
  }

  private verifyAllMetadata(): void {
    for (const [identifier, metadata] of this.services) {
      this.verifyMetadata(identifier, metadata)
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
}
