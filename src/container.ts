import { getDependencies } from './reflection'
import { Newable, ServiceIdentifier, ServiceMetadata } from './types'

export class Container {
  private readonly services: Map<
    ServiceIdentifier<unknown>,
    ServiceMetadata<unknown>
  > = new Map<ServiceIdentifier<unknown>, ServiceMetadata<unknown>>()

  public get<T>(identifier: ServiceIdentifier<T>): T {
    const service = this.services.get(identifier)

    if (!service) {
      throw new Error(`Service not registered for: ${identifier.name}`)
    }

    const missing = new Array<string>()
    const dependencies = new Array<unknown>()
    for (const dependencyIdentifier of service.dependencies) {
      try {
        const dependency = this.get(dependencyIdentifier)
        dependencies.push(dependency)
      } catch {
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

    return new (service.implementation as Newable<T>)(...dependencies)
  }

  public register<T>(implementation: Newable<T>): void {
    // if (!isService(implementation)) {
    //   decorate(ServiceDecorator(), implementation)
    // }

    const dependencies = getDependencies(implementation)

    console.log(`dependencies ${implementation.name}`, dependencies)

    this.services.set(implementation, {
      implementation,
      dependencies,
    })
  }
}
