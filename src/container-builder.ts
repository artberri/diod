import { DiodContainer } from './container'
import { Buildable, ServiceData } from './internal-types'
import { DiodRegistration } from './registration'
import {
  BuildOptions,
  ConfigurableRegistration,
  Container,
  Identifier,
  Newable,
  Registration,
  WithDependencies,
  WithScopeChange,
} from './types'
import { verify } from './verifier'

/**
 * Used to build an [[Container]] from service registrations.
 */
export class ContainerBuilder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly buildables = new Map<
    Identifier<unknown>,
    Buildable<Registration<unknown>, unknown>
  >()

  /**
   * Registers a service.
   * @param identifier The class that identifies this service. This class
   * identifier must be used to get the service from the container or when
   * defining it as a dependency.
   * @typeParam T The type of the service.
   * @returns
   */
  public register<T>(identifier: Identifier<T>): Registration<T> {
    if (this.buildables.has(identifier)) {
      throw new Error(
        `A service identified as ${identifier.name} has been already registered. You need to unregister it before you can register it again.`
      )
    }

    const buildable = DiodRegistration.createBuildable(identifier)
    this.buildables.set(identifier, buildable)
    return buildable.instance
  }

  /**
   * Unregister previously registered service.
   * @param identifier The class that identifies this service to be unregistered.
   * @typeParam T The type of the service.
   */
  public unregister<T>(identifier: Identifier<T>): void {
    if (!this.buildables.has(identifier)) {
      throw new Error(`There is no service registered as ${identifier.name}.`)
    }

    this.buildables.delete(identifier)
  }

  /**
   * Checks whether a service is registered or not.
   * @param identifier The class that identifies this service to be checked.
   * @typeParam T The type of the service.
   * @returns
   */
  public isRegistered<T>(identifier: Identifier<T>): boolean {
    return this.buildables.has(identifier)
  }

  /**
   * Alias for `.register(newable).use(newable)`.
   * @param newable The concrete class implementation to be registered as itself.
   * @typeParam T The type of the service.
   * @returns
   */
  public registerAndUse<T>(
    newable: Newable<T>
  ): ConfigurableRegistration & WithScopeChange & WithDependencies {
    return this.register(newable).use(newable)
  }

  /**
   * Builds an inmutable [[Container]].
   * @param options Build options.
   * @returns
   */
  public build({ autowire = true }: BuildOptions = {}): Container {
    const services = new Map<Identifier<unknown>, ServiceData<unknown>>()
    for (const [identifier, buildable] of this.buildables) {
      const data = buildable.build({ autowire })
      services.set(identifier, data)
    }
    verify(services)
    return new DiodContainer(services)
  }
}
