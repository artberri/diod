import { Container } from './container'
import { getDependencies } from './reflection'
import { Newable, ServiceIdentifier, ServiceMetadata } from './types'

export class ContainerBuilder {
  private readonly services: Map<
    ServiceIdentifier<unknown>,
    ServiceMetadata<unknown>
  > = new Map<ServiceIdentifier<unknown>, ServiceMetadata<unknown>>()

  public register<T>(implementation: Newable<T>): void {
    const dependencies = getDependencies(implementation)

    this.services.set(implementation, {
      implementation,
      dependencies,
    })
  }

  public build(): Container {
    return new Container(this.services)
  }
}
