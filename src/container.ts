import { Newable, Service, ServiceIdentifier } from './types'

export class Container {
  private readonly services: Map<
    ServiceIdentifier<unknown>,
    Service<unknown>
  > = new Map<ServiceIdentifier<unknown>, Service<unknown>>()

  public get<T>(identifier: ServiceIdentifier<T>): T {
    const service = this.services.get(identifier)

    if (!service) {
      throw new Error(`Class not registered for: ${identifier.name}`)
    }

    return new (service.implementation as Newable<T>)()
  }

  public add<T>(implementation: Newable<T>): void {
    this.services.set(implementation, {
      implementation,
    })
  }
}
