import { ClassConfiguration } from './configurations/class-configuration'
import { FactoryConfiguration } from './configurations/factory-configuration'
import { InstanceConfiguration } from './configurations/instance-configuration'
import { ServiceConfiguration } from './configurations/service-configuration'
import { Buildable, ServiceData } from './internal-types'
import { BuildOptions, Factory, Identifier, Instance, Newable } from './types'

export class Registration<T> {
  private buildable: Buildable<ServiceConfiguration<T>, T> | undefined

  private constructor(public readonly identifier: Identifier<T>) {}

  public useInstance(instance: Instance<T>): void {
    const buildable = InstanceConfiguration.createBuildable(instance)
    this.buildable = buildable
  }

  public useFactory(factory: Factory<T>): void {
    const buildable = FactoryConfiguration.createBuildable(factory)
    this.buildable = buildable
  }

  /**
   * Configure the class implementation that the identifier will provide.
   * @param newable The implementation that the identifier will provide.
   * @returns
   */
  public useClass(newable: Newable<T>): ClassConfiguration<T> {
    const buildable = ClassConfiguration.createBuildable(newable)
    this.buildable = buildable
    return buildable.instance
  }

  /**
   * Configure the class implementation that the identifier will provide.
   * Alias of `useClass`.
   * @param newable The implementation that the identifier will provide.
   * @returns Configu fluent API for
   */
  public use(newable: Newable<T>): ClassConfiguration<T> {
    return this.useClass(newable)
  }

  private build(options: BuildOptions): ServiceData<T> {
    if (this.buildable === undefined) {
      throw new Error(
        `Service ${this.identifier.name} registration is not completed. Use .registerAndUse(${this.identifier.name}) instead of .register(${this.identifier.name}) to use it directly or set any other registration use`
      )
    }

    return this.buildable.build(options)
  }

  /**
   * @internal
   */
  public static createBuildable<TIdentifier>(
    identifier: Identifier<TIdentifier>
  ): Buildable<Registration<TIdentifier>, TIdentifier> {
    const registration = new Registration(identifier)
    return {
      instance: registration,
      build: (options: BuildOptions): ServiceData<TIdentifier> =>
        registration.build(options),
    }
  }
}
